import React from 'react'
import "../styles/ExchangeCard.css"
const ExchangeCard = ({ name, rank, image, url }) => {
  return (
    <a className='click-url' href={url} target="blank">
      <div className='card-exchange' >
        <img src={image} alt="logo" className='card-image' />
        <p className='card-name'>{name}</p>
        <p className='card-rank'>Rank: {rank}</p>
      </div>
    </a>
  )
}

export default ExchangeCard