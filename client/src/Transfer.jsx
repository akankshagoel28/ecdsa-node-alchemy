import { useState } from "react";
import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1"
import { toHex, utf8ToBytes} from "ethereum-cryptography/utils"
import {keccak256} from "ethereum-cryptography/keccak"
function Transfer({ address, setBalance, privateKey, signature, setSignature}) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [hexMessage,setHexMessage]=useState("");
  const [r,setR]=useState("")
  const [s,setS]=useState("")
  const [recovery,setRecovery]=useState("")
  const setValue = (setter) => (evt) => setter(evt.target.value);
  async function hashAndSign() {
    try {
      const transactionMessage = {
        sender: address,
        amount: parseInt(sendAmount),
        recipient
      }
      const hashedMessage = keccak256(utf8ToBytes(JSON.stringify(transactionMessage)));
      const hexMessage = toHex(hashedMessage);  
      setHexMessage(hexMessage)
      const signature = await secp.secp256k1.sign(hexMessage, privateKey)
      setSignature(signature)
      const r=signature.r;
      setR(r)
      const s=signature.s;
      setS(s)
      const recovery=signature.recovery;
      setRecovery(recovery)
      console.log(signature)
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }
  async function transfer(evt) {
    evt.preventDefault();
    hashAndSign();
    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        r,
        s,
        recovery,
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        hexMessage
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
