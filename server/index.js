const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp= require("ethereum-cryptography/secp256k1");
const {toHex}=require('ethereum-cryptography/utils');
const {utf8ToBytes, toRawBytes}=require("ethereum-cryptography/utils")

app.use(cors());
app.use(express.json());

const balances = {
  "0268d97474888e7b0c88173c16a96e834419994e84fa439eabc1e8e4c2abfbdd07": 100,//49567ee48f27c61c1e5d0f57edc0e06008c5a075bedb3b92eee7e0606bcf09d3
  "03d09b6ec0b238cffc62a972bf45efd66f0ace07879ff8dfd3abcb1651144b7fdf": 50,//7fc8fbfb9e3837a15d96679b83ae316cb208846b1ae71596fed1ef47f85214e7
  "03b0220a8147016a8094ddbb909a92681763918edd05c5aed2d3507ceada64a153": 75,//dca5407b5462f8eec7de859ac4949c2979007e38bb2131ce1e3456dede7154b1
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0; 
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { r,s, recovery, recipient, amount, hexMessage, sender } = req.body;
  // const signatureAddress=toHex(signature.recoverPublicKey(hexMessage).toRawBytes())
  console.log(s)
  console.log(r),
  console.log(recovery)
  // if (signatureAddress !== sender) {
  //   res.status(400).send({message: "You are not the person!"})
  // }
  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
