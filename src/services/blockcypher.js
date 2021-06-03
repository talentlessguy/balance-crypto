export const blockcypher = {
  supported: ['BTC', 'LTC', 'DASH', 'DOGE'],
  check(addr) {
    return /^[1LMX3D][a-km-zA-HJ-NP-Z1-9]{26,33}$/.test(addr)
  },
  apiKey: 'blockcypher',
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
      balance: parseFloat(json.balance) / Math.pow(10, 8),
      asset: network
    }
  }
}
