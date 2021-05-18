import { base58 } from './base58.js'
import cbor from 'cbor-js'
import CRC from 'crc'

/**
 *
 * @param {string} address
 */
function getDecoded(address) {
  try {
    const decoded = base58(address)
    return cbor.decode(new Uint8Array(decoded).buffer)
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
