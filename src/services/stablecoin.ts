import { Service } from '..'
import * as stablecoin from 'stablecoin-api'

export const service: Service = {
  supported: ['USDC', 'BUSD', 'NGNT', 'ABCD'],
  check(addr) {
    return RegExp('^(0x)?[0-9a-fA-F]{40}$').test(addr)
  },
  symbol() {
    return 'ETH'
  },
  async fetch({ addr, verbose, coin }) {
    if (verbose) console.log(`Getting ${coin} address balance`)

    const balance = parseFloat(await stablecoin.balance(addr, coin))

    return {
      asset: 'ETH',
      balance
    }
  }
}
