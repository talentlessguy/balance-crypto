import { fetch } from 'fetch-h2'
import type { Service, WalletInfo } from '../index'

const multiplier = Math.pow(10, 8)

type BlockCypherService = Omit<Service, 'fetch'> & {
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

export const service: BlockCypherService = {
  supported: ['BTC', 'LTC', 'DASH', 'DOGE', 'ETH'],
  check(addr) {
    return /^[1LMX3D][a-km-zA-HJ-NP-Z1-9]{26,33}$/.test(addr)
  },

  async fetch({ addr, apiKey, verbose }) {
    const network = {
      1: 'BTC',
      3: 'BTC',
      L: 'LTC',
      M: 'LTC',
      X: 'DASH',
      D: 'DOGE'
    }[addr[0]]

    const url = `https://api.blockcypher.com/v1/${network.toLowerCase()}/main/addrs/${addr}${
      apiKey ? `?token=${apiKey}` : ''
    }`

    if (verbose) console.log(`Requesting ${url}`)

    const res = await fetch(url)

    const json = await res.json()

    if (res.status < 200 || res.status >= 300) throw new Error(JSON.stringify(res))

    return {
      balance: parseFloat(json.balance) / multiplier,
      asset: network
    }
  }
}
