import { Service } from '..'
import { ERC20Balance } from 'erc20-balance'
import list from 'erc20-balance/dist/list.json'
import { fetch } from 'fetch-h2'

export const service: Service = {
  supported: list.map((list) => list.symbol),
  check(addr) {
    return RegExp('^(0x)?[0-9a-fA-F]{40}$').test(addr)
  },
  apiKey: 'etherscan',
  async fetch({ addr, apiKey = 'freekey', verbose, coin }) {
    // @ts-ignore
    globalThis.fetch = fetch
    const { balance, symbol, ...result } = await ERC20Balance({ addr, apiKey, coin })
    globalThis.fetch = undefined

    if (verbose) console.log(`Requesting EtherScan API for ${coin}`)

    return {
      ...result,
      asset: symbol,
      balance
    }
  }
}
