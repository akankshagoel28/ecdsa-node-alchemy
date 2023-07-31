const secp= require("ethereum-cryptography/secp256k1");
const {toHex}=require('ethereum-cryptography/utils');
const {keccak256}=require("ethereum-cryptography/keccak")
const {utf8ToBytes, toRawBytes}=require("ethereum-cryptography/utils")
const privateKey=toHex(secp.secp256k1.utils.randomPrivateKey());
console.log('Private Key:',privateKey)
const publicKey=toHex(secp.secp256k1.getPublicKey(privateKey))
console.log('Public Key:',publicKey)
async function hashAndSign() {
    try{
      const transactionMessage = {
        sender: publicKey,
        amount: 100,
        recipient:'03b0220a8147016a8094ddbb909a92681763918edd05c5aed2d3507ceada64a153'
      }

    // hash the transaction'. You have to change the message to string first, then byte. After that hash it.
    const hashedMessage = keccak256(utf8ToBytes(JSON.stringify(transactionMessage)));
    const hexMessage = toHex(hashedMessage);

    // sign the message with private key. it will return an array with two elements. First one is signature. Get the hex version of it.Second one is recovery bit.

    const signatureArray = await secp.secp256k1.sign(hexMessage, privateKey);
    const sig=signatureArray.s
    const recoveredPublicKey=toHex(signatureArray.recoverPublicKey(hexMessage).toRawBytes())
    console.log(signatureArray)
    console.log(recoveredPublicKey)
    }
    catch (error){
      console.log(error);
    }
    
}
hashAndSign();
