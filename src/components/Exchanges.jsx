import React, { useEffect, useState } from 'react'
import ExchangeCard from './ExchangeCard'
import Axios from "axios";
import "../styles/Exchanges.css"
import Loader from './Loader';
const Exchanges = () => {

  const [exchangeData, setexchangeData] = useState([]);
  const [pageNum, setpageNum] = useState(1);
  const [loader, setloader] = useState(true)

  const incrementPage = () => {
    if (pageNum > 0 && pageNum < 6) {
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
        const apiData = await Axios.get(`https://api.coingecko.com/api/v3/exchanges?page=${pageNum}`);
        setexchangeData(apiData.data);
        setloader(false);
      } catch (error) {
        console.log(error);
      }
    }
    apiCall();
  }, [pageNum])

  if (loader) {
    return (<Loader/>)
  }

  return (
    <div>
      <h1 style={{"textAlign": "center" , "letterSpacing":"5px" ,"textTransform": "uppercase"}}>Exchanges</h1>
      <div className="card-container">
        {exchangeData.map((data) => (
          <ExchangeCard key={data.id} name= {data.name} image = {data.image} rank = {data.trust_score_rank} url = {data.url}/>
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

export default Exchanges