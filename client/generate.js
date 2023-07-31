import * as secp from "ethereum-cryptography/secp256k1"
import {toHex} from 'ethereum-cryptography/utils'
const privateKey=secp.secp256k1.utils.randomPrivateKey()
console.log('Private Key:',toHex(privateKey))
const publicKey=toHex(secp.getPublicKey(privateKey))
console.log('Public Key:',publicKey)
