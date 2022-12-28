import React, { useState } from 'react'
import { productState } from '../../types/interface/index';


interface Props {
  state: productState
}

const Card: React.FC = (props) => {

  const { state } = props as Props

  return (
    <article className="card-product">
      <h2 className="title-product-card"> {state.title} </h2>
      <img src={state.image} alt="" />
      <p className="price-product-card"> {state.price} € </p>
    </article>
  )
}

export default Card