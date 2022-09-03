import { useState, useEffect } from "react";



function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [amount, setAmount] = useState(0);
  const [cost, setCost] = useState(1);
  const handleInput = (event) => {setAmount(event.target.value)};
  const onChange = (event) => {setCost(event.target.value)};
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, [])
  return (
    <div>
      <h1>The Coins!{loading ? "" : `(${coins.length})`}</h1>
      {loading ? <strong>Loading...</strong> : 
      <select onChange={onChange}>
        <option>Select Coin!</option>
      {coins.map((coin) => (
        <option 
        key={coin.id}
        value={coin.quotes.USD.price}
        >{coin.name} ({coin.symbol}) : ${coin.quotes.USD.price}</option>
      ))}
    </select>}
    <h2>Please enter the amount you have</h2>
    <form>
      <input 
       value={amount}
       type="number"
       onChange={handleInput}
       placeholder="dollar"
      /> $
    </form>
    <h2>you can get {amount/cost} coins!</h2>
    </div>
  );
}

export default App;
