import type { Service } from './mod.ts'
import { ERC20Balance, list } from 'https://deno.land/x/erc20_balance@0.1.11/mod.ts'
export { cardano } from '../src/services/cardano.js'
export { chainz } from '../src/services/chainz.js'

export const blockcypher: Service = {
  supported: ['BTC', 'LTC', 'DASH', 'DOGE', 'ETH'],
  check(addr) {
    return /^[1LMX3D][a-km-zA-HJ-NP-Z1-9]{26,33}$/.test(addr)
  },
  apiKey: 'blockcypher',
  async fetch({ addr, apiKey, verbose }) {
    const network =
      {
        1: 'BTC',
        3: 'BTC',
        L: 'LTC',
        M: 'LTC',
        X: 'DASH',
        D: 'DOGE'
      }[addr[0]] || 'BTC'

    const url = `https://api.blockcypher.com/v1/${network.toLowerCase()}/main/addrs/${addr}${
      apiKey ? `?token=${apiKey}` : ''
    }`

    if (verbose) console.log(`Requesting ${url}`)

    const res = await fetch(url)

    const json = await res.json()

    if (res.status < 200 || res.status >= 300) throw new Error(JSON.stringify(res))

    return {
      balance: parseFloat(json.balance) / Math.pow(10, 8),
      asset: network
    }
  }
}

export const etherscan: Service = {
  supported: list.map((x) => x.symbol),
  check(addr) {
    return RegExp('^(0x)?[0-9a-fA-F]{40}$').test(addr)
  },
  apiKey: 'etherscan',
  async fetch({ addr, apiKey = 'freekey', verbose, coin }) {
    const { balance, symbol, ...result } = await ERC20Balance({ addr, apiKey, coin })

    if (verbose) console.log(`Requesting EtherScan API for ${coin}`)

    return {
      ...result,
      asset: symbol,
      balance
    }
  }
}
