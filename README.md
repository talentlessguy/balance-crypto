# money-in-my-wallet

Get wallet balance for 30+ cryptos with a unified interface.

## Install

```sh
pnpm i money-in-my-wallet
```

## Usage

```ts
import { balance } from 'money-in-my-wallet'

balance('3PxedDftWBXujWtr7TbWQSiYTsZJoMD8K5', 'BTC', 'OPTIONAL_API_KEY').then((res) => console.log(res))
```

## Supported cryptos

| Asset                | Service                  |
| -------------------- | ------------------------ |
| ETH                  | https://ethplorer.io     |
| ERC20 Tokens         | https://tokenbalance.com |
| BTC, DASH, LTC, DOGE | https://blockcypher.com  |
