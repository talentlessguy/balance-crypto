![](logo.svg)

# money-in-my-wallet

Get wallet balance for 300+ cryptos with a unified interface.

## Install

```sh
pnpm i money-in-my-wallet
```

## Usage

```ts
import { balance } from 'money-in-my-wallet'

balance('3PxedDftWBXujWtr7TbWQSiYTsZJoMD8K5', 'BTC', 'OPTIONAL_API_KEY').then((res) => console.log(res))
```

Result:

```json
{ "balance": 0, "asset": "BTC" }
```

## Supported cryptos

| Asset                     | Service                      | Optional API key |
| ------------------------- | ---------------------------- | ---------------- |
| ETH                       | https://ethplorer.io         | ☑                |
| ERC20 Tokens (except ETH) | https://tokenbalance.com     |                  |
| BTC, DASH, LTC, DOGE      | https://blockcypher.com      | ☑                |
| BTC-based tokens          | https://chainz.cryptoid.info |                  |
