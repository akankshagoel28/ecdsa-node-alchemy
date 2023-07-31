import server from "./server";

function Wallet({ address, setAddress, balance, setBalance, privateKey,setPrivateKey }) {
  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address)
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  function set(evt){
    privateKey=evt.target.value
    setPrivateKey(privateKey)
  }
  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Your Public Address
        <input placeholder="Give your public address " value={address} onChange={onChange}></input>
      </label>

      <label>
        Your Private Address
        <input placeholder="Give your private address " value={privateKey} onChange={set}></input>
      </label>




      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
