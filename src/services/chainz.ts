import { Service } from '..'
import fetch from 'node-fetch'

export const service: Service = {
  supported: ['LTC', 'STRAT', 'DGB', 'BTC', 'DASH', 'LTC'],

  check(addr) {
    return RegExp('^[SMD][a-km-zA-HJ-NP-Z0-9]{26,33}$').test(addr)
  },

  symbol() {
    return 'BTC'
  },

  async fetch({ addr, coin }) {
    const url = `https://chainz.cryptoid.info/${coin.toLowerCase()}/api.dws?q=getbalance&a=${addr}`

    const res = await fetch(url)

    if (res.statusCode < 200 || res.statusCode >= 300) throw new Error(JSON.stringify(res))

    const json = await res.json()

    return {
      balance: parseFloat(json),
      asset: coin
    }
  }
}
