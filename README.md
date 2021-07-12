![](logo.svg)

<div align="center">
  
# balance-crypto

![Vulnerabilities][vulns-badge-url]
[![Version][v-badge-url]][npm-url]
![Minified size][size-badge-url] [![Downloads][dl-badge-url]][npm-url] [![GitHub Workflow Status][gh-actions-img]][github-actions] [![Codecov][cov-badge-url]][cov-url] [![DEV](https://badge.devprotocol.xyz/0xB6927E8c58fF0dAf9446F52fc499B2f78eB811A3)](https://stakes.social/0xB6927E8c58fF0dAf9446F52fc499B2f78eB811A3)
  
</div>



Get wallet balance for 2.3K+ cryptocurrencies with a single function.

### Comparison to [crypto-balances-2](https://github.com/danielheyman/crypto-balances):

- 🔐 API keys support (for EtherScan and BlockCypher)
- 💙 written in TypeScript
- ⚡ doesn't depend on request libraries
- 📦 smaller library size
- 🦕 Deno and Node.js support

## Install

```sh
# pnpm
pnpm i balance-crypto
# yarn
yarn add balance-crypto
# npm
npm i balance-crypto
```

To use the module in Deno import it like this: `import { balance } from 'https://deno.land/x/balance_crypto/deno/mod.ts'`

## Example

### Node.js

```ts
import { balance } from 'balance-crypto'
import fetch from 'node-fetch'

balance('3PxedDftWBXujWtr7TbWQSiYTsZJoMD8K5', 'BTC', {
  keys: {
    etherscan: process.env.ETHERSCAN_KEY,
    blockcypher: process.env.BLOCKYCPHER_KEY
  },
  verbose: true
}).then((res) => console.log(res))
```

### Deno

```ts
import { balance } from 'https://deno.land/x/balance_crypto/deno/mod.ts'

balance('3PxedDftWBXujWtr7TbWQSiYTsZJoMD8K5', 'BTC', {
  keys: {
    etherscan: Deno.env.get('ETHERSCAN_KEY'),
    blockcypher: Deno.env.get('BLOCKYCPHER_KEY')
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

## Donate

The best way to support the project is to stake it on [**DEV**](https://stakes.social/0xB6927E8c58fF0dAf9446F52fc499B2f78eB811A3). Note that you also get rewarded by staking, as well as the project author.

These 3 addresses were rewarded with 10DEV as a bonus for staking:

1. 0xE603eB00619E81d8b4954be13B59D7B6A2DC2B75
2. 0x257f2d64A2C51584e2e650e9Fd9bC4A0621c549F
3. 0xDEd284B5c60FFC7BdBe707a10de301D566eCA86D (jerryrigg411420)

[vulns-badge-url]: https://img.shields.io/snyk/vulnerabilities/npm/balance-crypto.svg?style=flat-square
[v-badge-url]: https://img.shields.io/npm/v/balance-crypto.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/balance-crypto
[size-badge-url]: https://img.shields.io/bundlephobia/min/balance-crypto.svg?style=flat-square
[cov-badge-url]: https://img.shields.io/codecov/c/gh/talentlessguy/balance-crypto?style=flat-square
[cov-url]: https://codecov.io/gh/talentlessguy/balance-crypto
[dl-badge-url]: https://img.shields.io/npm/dt/balance-crypto?style=flat-square
[github-actions]: https://github.com/talentlessguy/balance-crypto/actions
[gh-actions-img]: https://img.shields.io/github/workflow/status/talentlessguy/tinyhttp/CI?style=flat-square
