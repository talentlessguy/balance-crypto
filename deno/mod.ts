import * as services from './services.ts'

export type WalletInfo<T = unknown> = { asset: string; balance: number } & T

export type APIKeys = Partial<{
  etherscan: string
  blockcypher: string
}>

/**
 * Wallet balance service interface
 */
export type Service<T = unknown> = {
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
    apiKey?: keyof API
    coin: string
    verbose?: boolean
  }) => WalletInfo<T> | Promise<WalletInfo<T>>

  /**
   * Optional API key
   */
  apiKey?: keyof APIKeys
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
 */
export const balance = async (addr: string, coin: string, opts?: { apiKeys?: APIKeys; verbose?: boolean }) => {
  coin = coin.toUpperCase()
  for (const [s, service] of Object.entries(services as Record<string, Service>)) {
    const isSupported = service.supported.includes(coin)

    if (isSupported) {
      if (!service.check(addr)) throw new Error(`Invalid address "${addr}" for ${coin}`)

      const result = await service.fetch({
        addr,
        apiKey: opts?.apiKeys?.[service.apiKey!],
        coin,
        verbose: opts?.verbose
      })

      return result
    }
  }
}
