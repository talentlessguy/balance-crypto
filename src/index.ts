import services from './services'

export type Service = {
  supported: string[]
  check: (addr: string) => boolean
  symbol: (addr: string) => string
  fetch: ({
    addr,
    apiKey,
    coin
  }: {
    addr: string
    apiKey?: string
    coin?: string
  }) => { asset: string; balance: number } | Promise<{ asset: string; balance: number }>
}

export const balance = async (addr: string, coin: string, apiKey?: string) => {
  let addrType = ''

  const result = []
  const runService = async (s: string, service: Service) => {
    const isSupported = service.supported.map((c) => c.toLowerCase()).includes(coin.toLowerCase())

    if (isSupported && service.check(addr)) {
      try {
        const resp = await service.fetch({ addr, apiKey, coin })

        result.push(resp)
      } catch (e) {
        result.push([{ error: `${s}: ${e.message}` }])
      }

      if (!addrType) addrType = service.symbol(addr)
    }
  }

  for (const [s, service] of Object.entries(services)) {
    await runService(s, service)
  }

  return result
}
