import services from './services'

export type WalletInfo = { asset: string; balance: number }

/**
 * Wallet balance service interface
 */
export type Service = {
  /**
   * List of supported assets
   */
  supported: string[]
  /**
   * Check if it supports the specified address of a token
   */
  check: (addr: string) => boolean
  /**
   * Fetch data from the service and return the formatted response object
   */
  fetch: ({
    addr,
    apiKey,
    coin,
    verbose
  }: {
    addr: string
    apiKey?: string
    coin: string
    verbose?: boolean
  }) => WalletInfo | Promise<WalletInfo>
}

/**
 * Get a crypto wallet balance.
 * @example
 * ```js
 * import { balance } from 'money-in-my-wallet'
 *
 * balance('3PxedDftWBXujWtr7TbWQSiYTsZJoMD8K5', 'BTC').then(console.log)
 * ```
 * @param addr Wallet address
 * @param coin Asset name (e.g. `ETH`)
 * @param apiKey Optional API key
 * @param verbose Enable verbose logging
 */
export const balance = async (addr: string, coin: string, apiKey?: string, verbose?: boolean) => {
  coin = coin.toUpperCase()
  for (const [s, service] of Object.entries(services)) {
    const isSupported = service.supported.includes(coin)

    if (isSupported) {
      if (!service.check(addr)) {
        throw new Error(`Invalid address "${addr}" for ${coin}`)
      }
      const result = await service.fetch({ addr, apiKey, coin, verbose })

      return result
    }
  }
}
