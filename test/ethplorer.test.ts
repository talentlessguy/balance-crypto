import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { balance } from '../src/index'

const t = suite('ethplorer')

t('should reject invalid address', async () => {
  try {
    await balance('invalid', 'ETH')
  } catch (e) {
    assert.equal(e.message, 'Invalid address "invalid" for ETH')
    assert.instance(e, Error)
  }
})

t('should support ETH', async () => {
  const result = await balance('0xD3B282e9880cDcB1142830731cD83f7ac0e1043f', 'ETH')

  assert.is.not(result?.balance, null)

  assert.is(result?.asset, 'ETH')
})

t.run()
