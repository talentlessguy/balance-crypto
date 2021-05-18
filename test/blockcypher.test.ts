import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { balance } from '../src/index'

import fetch from 'node-fetch'

// Fetch polyfill
globalThis.fetch = fetch

const t = suite('api.blockcypher.com')

t('should reject invalid address', async () => {
  try {
    await balance('invalid', 'BTC')
  } catch (e) {
    assert.equal(e.message, 'Invalid address "invalid" for BTC')
    assert.instance(e, Error)
  }
})

t('should support BTC, LTC, DASH and DOGE addresses', async () => {
  const balances = [
    {
      coin: 'BTC',
      address: '3PxedDftWBXujWtr7TbWQSiYTsZJoMD8K5'
    },
    {
      coin: 'LTC',
      address: 'MBk5YpWiqWmWC1EVY28qfoKygGQwX343Uu'
    },
    {
      coin: 'DASH',
      address: 'XnTVbwYQdkQNa3ZRsyAA4y1fgMAtmEgb61'
    },
    {
      coin: 'DOGE',
      address: 'DBXu2kgc3xtvCUWFcxFE3r9hEYgmuaaCyD'
    }
  ]

  for (const b of balances) {
    const result = await balance(b.address, b.coin)

    assert.is.not(result?.balance, null)

    assert.is(result?.asset, b.coin)
  }
})

t.run()
