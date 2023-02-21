import React, { useEffect, useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/UserContext'
import { imageInterface, productInterface } from '../../../types/interface'

const Card: React.FC<productInterface> = (props: productInterface) => {
  const { id, title, price,  description, slug, images } = props as productInterface
  const navigate = useNavigate()
  const { isUserConnected } = useContext(AuthContext)


  const handleClickNavigate = (slug: string) => {
    navigate(`/product/${slug}`)
  }

  return (
    <article className="card-article-product">
      <div className="container-img-card-product">
        {
            <img className="card-img-product" src={images} alt={slug} title={title} />
        }
      </div>
      <div className="container-informations-card-product">
        <h2 className="card-title-product"> {title}</h2>
        <p className="card-description-product"> {description}</p>
        <div className="container-btn-card-product">
          <p className="card-price-product"> {price} €</p>
          <div className="undercontainer-btn-card-product">
            {
              isUserConnected ?
              <button className='btn-card-product' >Ajouter au panier</button> :
              null
            }
            <button onClick={() => handleClickNavigate(slug)} className='btn-card-product' >Voir produit</button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Card