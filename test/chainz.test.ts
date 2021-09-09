import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { balance } from '../src/index'
import fetch from 'node-fetch'

// @ts-ignore fetch polyfill
globalThis.fetch = fetch

const t = suite('chainz.cryptoid.info')

t('should support BTC-based tokens', async () => {
  const balances = [
    {
      coin: 'SYS',
      address: 'sys1qc4lwqaz4ln0fgvj0pakx6ag6q3hv6nlg942trk'
    },
    {
      coin: 'STRAX',
      address: 'XVo8HS7HE7YWHqyxK664sP9zBniUf97QxE'
    },
    {
      coin: 'PPC',
      address: 'PN9ZrKwPttJxM8VMsfBFtAWzbycpG2cosD'
    }
  ]

  for (const b of balances) {
    const result = await balance(b.address, b.coin)

    assert.is.not(result?.balance, null)

    assert.is(result?.asset, b.coin)
  }
})
