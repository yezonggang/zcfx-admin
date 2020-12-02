import CryptoJS from 'crypto-js'

var SHA1PRNG = require('@/utils/encrypt/seed');
var key = CryptoJS.enc.Hex.parse(SHA1PRNG("sefonsoft1qa2ws3ed!@#$%^").toString('hex'))

export function encrypt(pas) {
  var encrypted = CryptoJS.AES.encrypt(pas, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.ciphertext.toString().toUpperCase()
}
