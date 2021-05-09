import { Service } from '..'
import { fetch } from 'fetch-h2'

export const service: Service = {
  supported: ['ETH'],
  check(addr) {
    return RegExp('^(0x)?[0-9a-fA-F]{40}$').test(addr)
  },
  symbol() {
    return 'ETH'
  },
  async fetch({ addr, apiKey = 'freekey', verbose }) {
    const url = `https://api.ethplorer.io/getAddressInfo/${addr}?apiKey=${apiKey}`
    if (verbose) console.log(`Requesting ${url}`)
    const res = await fetch(url)

    const json = await res.json()

    const balance = json.ETH.balance

    if (res.status < 200 || res.status >= 300) throw new Error(JSON.stringify(json))

    return {
      asset: 'ETH',
      balance: balance
    }
  }
}
