import fetch from 'node-fetch'
import { Service } from '../index'

const multiplier = Math.pow(10, 8)

export const service: Service = {
  supported: ['BTC', 'LTC', 'DASH', 'DOGE', 'ETH'],
  check(addr) {
    return RegExp('^[LXD13][a-km-zA-HJ-NP-Z0-9]{26,33}$').test(addr)
  },
  symbol(addr) {
    return {
      1: 'BTC',
      3: 'BTC',
      L: 'LTC',
      X: 'DASH',
      D: 'DOGE'
    }[addr[0]]
  },
  async fetch({ addr, apiKey, verbose }) {
    const network = this.symbol(addr)

    const url = `https://api.blockcypher.com/v1/${network.toLowerCase()}/main/addrs/${addr}${
      apiKey ? `?token=${apiKey}` : ''
    }`

    if (verbose) console.log(`Requesting ${url}`)

    const res = await fetch(url, { json: true })

    const json = await res.json()

    if (res.statusCode < 200 || res.statusCode >= 300) throw new Error(JSON.stringify(res))

    return {
      balance: parseFloat(json.balance) / multiplier,
      asset: network
    }
  }
}
