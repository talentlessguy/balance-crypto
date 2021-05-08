import { Service } from '..'
import fetch from 'node-fetch'

export const service: Service = {
  supported: ['ADA'],

  check(addr) {
    return RegExp('/[1-9A-HJ-NP-Za-km-z]{104}/').test(addr)
  },

  symbol() {
    return 'ADA'
  },

  async fetch({ addr, coin, verbose }) {
    const url = `https://explorer.cardano.org/graphql`

    const body = {
      query:
        'query searchForPaymentAddress($address: String!) {\n  transactions_aggregate(where: {_or: [{inputs: {address: {_eq: $address}}}, {outputs: {address: {_eq: $address}}}]}) {\n    aggregate {\n      count\n    }\n  }\n  paymentAddresses(addresses: [$address]) {\n    summary {\n      assetBalances {\n        asset {\n          assetName\n          description\n          fingerprint\n          name\n          policyId\n          ticker\n        }\n        quantity\n      }\n    }\n  }\n}\n',
      variables: {
        address: addr
      }
    }

    if (verbose) console.log(`Requesting ${url}`)

    const res = await fetch(url, {
      method: 'POST',
      body
    })

    if (res.status < 200 || res.status >= 300) throw new Error(JSON.stringify(res))

    const { data } = await res.json()

    const balance = parseInt(data.paymentAddresses[0].summary.assetBalances[0].quantity, 10) / 10 ** 6

    return {
      balance,
      asset: coin
    }
  }
}
