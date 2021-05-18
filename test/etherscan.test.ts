import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { balance } from '../src/index'
import * as dotenv from '@tinyhttp/dotenv'
import fetch from 'node-fetch'

// Fetch polyfill
globalThis.fetch = fetch

dotenv.config()

const t = suite('etherscan.io')

t('should reject invalid address', async () => {
  try {
    await balance('invalid', 'ETH')
  } catch (e) {
    assert.equal(e.message, 'Invalid address "invalid" for ETH')
    assert.instance(e, Error)
  }
})

t('should support ETH', async () => {
  const result = await balance('0xD3B282e9880cDcB1142830731cD83f7ac0e1043f', 'ETH', {
    apiKeys: {
      etherscan: process.env.ETHERSCAN_KEY
    }
  })

  assert.is.not(result?.balance, null)

  assert.is(result?.asset, 'ETH')
})

t('should support ETH-based tokens', async () => {
  const balances = [
    {
      coin: 'LINK',
      address: '0xcd0da1c9b0DA7D2b862bbF813cB50f76F2fB4F5d'
    },
    {
      coin: 'ZRX',
      address: '0xbb415945A71C145525c96D00e9a0df97c9995cf2'
    }
  ]

  for (const b of balances) {
    const result = await balance(b.address, b.coin, {
      apiKeys: {
        etherscan: process.env.ETHERSCAN_KEY
      }
    })

    assert.is.not(result?.balance, null)

    assert.is(result?.asset, b.coin)
  }
})

t.run()
