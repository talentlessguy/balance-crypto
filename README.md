![](logo.svg)

# balance-crypto

![Vulnerabilities][vulns-badge-url]
[![Version][v-badge-url]][npm-url]
![Last commit][last-commit-badge-url]
![Minified size][size-badge-url] [![Downloads][dl-badge-url]][npm-url] [![GitHub Workflow Status][gh-actions-img]][github-actions] [![Codecov][cov-badge-url]][cov-url]

Get wallet balance for 2000+ cryptos with a unified interface.

### Comparison to [crypto-balances-2](https://github.com/danielheyman/crypto-balances):

- 🔐 API keys support (for EtherScan and BlockCypher)
- 💙 written in TypeScript
- ⚡ uses `node-fetch` instead of deprecated `request`
- 📦 smaller library size

## Install

```sh
# pnpm
pnpm i balance-crypto
# yarn
yarn add balance-crypto
# npm
npm i balance-crypto
```

## Example

```ts
import { balance } from 'balance-crypto'
import fetch from 'node-fetch'

// Fetch polyfill
globalThis.fetch = fetch

balance('3PxedDftWBXujWtr7TbWQSiYTsZJoMD8K5', 'BTC', {
  keys: {
    etherscan: process.env.ETHERSCAN_KEY,
    blockcypher: process.env.BLOCKYCPHER_KEY
  },
  verbose: true
}).then((res) => console.log(res))
```

Result:

```json
{ "balance": 0, "asset": "BTC" }
```

## Supported cryptos

| Asset                | Service                      | API key       |
| -------------------- | ---------------------------- | ------------- |
| ETH, ERC-20 tokens   | https://etherscan.io         | ✔️            |
| BTC, DASH, LTC, DOGE | https://blockcypher.com      | ✔️ (optional) |
| BTC-based tokens     | https://chainz.cryptoid.info |               |
| ADA                  | https://explorer.cardano.org |               |

[vulns-badge-url]: https://img.shields.io/snyk/vulnerabilities/npm/balance-crypto.svg?style=flat-square
[v-badge-url]: https://img.shields.io/npm/v/balance-crypto.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/balance-crypto
[last-commit-badge-url]: https://img.shields.io/github/last-commit/talentlessguy/balance-crypto.svg?style=flat-square
[size-badge-url]: https://img.shields.io/bundlephobia/min/balance-crypto.svg?style=flat-square
[cov-badge-url]: https://img.shields.io/codecov/c/gh/talentlessguy/balance-crypto?style=flat-square
[cov-url]: https://codecov.io/gh/talentlessguy/balance-crypto
[dl-badge-url]: https://img.shields.io/npm/dt/balance-crypto?style=flat-square
[github-actions]: https://github.com/talentlessguy/balance-crypto/actions
[gh-actions-img]: https://img.shields.io/github/workflow/status/talentlessguy/tinyhttp/CI?style=flat-square
