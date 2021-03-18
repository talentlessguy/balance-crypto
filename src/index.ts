import services from './services'

type WalletInfo = { asset: string; balance: number }

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
  symbol: (addr: string) => string
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
    coin?: string
    verbose?: boolean
  }) => WalletInfo | Promise<WalletInfo>
}

type result = Partial<WalletInfo> & { error?: string }

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
 * @param verbose Verbose logging
 */
export const balance = async (addr: string, coin: string, apiKey?: string, verbose?: boolean) => {
  let addrType = ''

  let result: result
  const runService = async (s: string, service: Service) => {
    const isSupported = service.supported.map((c) => c.toLowerCase()).includes(coin.toLowerCase())

    if (isSupported && service.check(addr)) {
      try {
        const resp = await service.fetch({ addr, apiKey, coin, verbose })

        result = resp
      } catch (e) {
        result = { error: `${s}: ${e.message}` }
      }

      if (!addrType) addrType = service.symbol(addr)
    }
  }

  for (const [s, service] of Object.entries(services)) {
    if (verbose) console.log(`Querying ${s}`)
    if ((result as WalletInfo)?.asset) {
      break
    }
    await runService(s, service)
  }

  return result
}
