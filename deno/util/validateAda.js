import { base58 } from '../../src/util/base58.js'
import { encode } from 'https://deno.land/x/cbor@v0.8.2/index.js'
import CRC from 'https://esm.sh/crc'

/**
 *
 * @param {string} address
 */
function getDecoded(address) {
  try {
    return encode(new Uint8Array(base58(address)).buffer)
  } catch (e) {
    // if decoding fails, assume invalid address
    return null
  }
}

/**
 *
 * @param {string} address
 * @returns {boolean}
 */
export function isValidAddressV1(address) {
  const decoded = getDecoded(address)

  if (!decoded || (!Array.isArray(decoded) && decoded.length != 2)) {
    return false
  }

  const tagged = decoded[0]
  const validCrc = decoded[1]
  if (typeof validCrc != 'number') {
    return false
  }

  // get crc of the payload
  const crc = CRC.crc32(tagged)

  return crc == validCrc
}
