import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { balance } from '../src/index'
import * as dotenv from '@tinyhttp/dotenv'
import fetch from 'node-fetch'

// Fetch polyfill
globalThis.fetch = fetch

dotenv.config()

const t = suite('explorer.cardano.org')

t('should reject invalid address', async () => {
  try {
    await balance('invalid', 'ETH')
  } catch (e) {
    assert.equal(e.message, 'Invalid address "invalid" for ETH')
    assert.instance(e, Error)
  }
})

t('should support ADA', async () => {
  const result = await balance('Ae2tdPwUPEZFRbyhz3cpfC2CumGzNkFBN2L42rcUc2yjQpEkxDbkPodpMAi', 'ADA')

  assert.is.not(result?.balance, null)

  assert.is(result?.asset, 'ADA')
})

t.run()
