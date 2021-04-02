import { Service } from '..'
import * as stablecoin from 'stablecoin-api'

export const service: Service = {
  supported: ['USDC', 'NGNT'],
  check(addr) {
    return RegExp('^(0x)?[0-9a-fA-F]{40}$').test(addr)
  },
  symbol() {
    return 'ETH'
  },
  async fetch({ addr, verbose, coin, apiKey }) {
    if (verbose) console.log(`Getting ${coin} address balance`)

    const balance = parseFloat(
      await stablecoin.balance(addr, coin, {
        etherscan: apiKey
      })
    )

    return {
      asset: 'ETH',
      balance
    }
  }
}
