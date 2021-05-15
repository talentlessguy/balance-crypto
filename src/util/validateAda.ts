import { base58 } from './base58'
import cbor from 'cbor-js'
import CRC from 'crc'

function getDecoded(address: string) {
  try {
    const decoded = base58(address)
    return cbor.decode(new Uint8Array(decoded).buffer)
  } catch (e) {
    // if decoding fails, assume invalid address
    return null
  }
}

export function isValidAddressV1(address: string) {
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
