import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/coinCard.css"
const CoinCard = ({ id, name, image, price, currrencySymbol, coinSymbol }) => {
  return (
    <Link to={`/coin/${id}`} >
      <div className='card-exchange' >
        <img src={image} alt="logo" className='card-image' />
        <p className='card-symbol'>{coinSymbol}</p>
        <p className='coin-name'>{name}</p>
        <p className='card-price'>{price ? `${currrencySymbol} ${price}` : "NA"}</p>
      </div>
    </Link>
  )
}

export default CoinCard;