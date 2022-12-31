import React, { useEffect, useState } from 'react';
import Axios from "axios";
import CoinCard from './CoinCard';
import Loader from './Loader';
import "../styles/Coin.css";


const Coins = () => {

  const [coinData, setcoinData] = useState([]);
  const [currencySymbol, setcurrencySymbol] = useState("INR");
  const [pageNum, setpageNum] = useState(1);
  const [loader, setloader] = useState(true);


  const incrementPage = () => {
    if (pageNum > 0 && pageNum < 130) {
      setpageNum(pageNum + 1)
    }
  }
  const decrementPage = () => {
    if (pageNum > 0 && pageNum > 1) {
      setpageNum(pageNum - 1)
    }
  }

  useEffect(() => {
    async function apiCall() {
      try {
        const apiData = await Axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currencySymbol}&per_page=100&page=${pageNum}`);
        setcoinData(apiData.data);
        setloader(false);
      } catch (error) {
        setloader(true)
        alert("Something went wrong!!!")
        console.log(error);
      }
    }
    apiCall();
  }, [pageNum , currencySymbol])

  if (loader) {
    return (<Loader />)
  }

  return (
    <div>
      <h1 style={{ "textAlign": "center", "letterSpacing": "5px", "textTransform": "uppercase" }}>Coins</h1>
      <div onClick={() => setcurrencySymbol(event.target.value)} className="radio-btns">
        <input type="radio" name="currency" value={"INR"} />INR
        <input type="radio" name="currency" value={"USD"} />USD
        <input type="radio" name="currency" value={"EUR"} />EUR
      </div>
      <div className="coin-container">
        {coinData.map((i) => (
          <CoinCard key={i.id}  id= {i.id} name={i.name} price={i.current_price} image={i.image} coinSymbol={i.symbol} currrencySymbol={currencySymbol} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={decrementPage}>{"< Prev"}</button>
        <a >{pageNum}</a>
        <button onClick={incrementPage}>{"Next >"}</button>
      </div>
    </div>
  )
}

export default Coins