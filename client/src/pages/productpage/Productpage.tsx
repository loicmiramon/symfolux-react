import React, { useEffect, useState } from 'react'
import Navigation from '../../components/navigation/Navigation'
import { useParams, useNavigate } from 'react-router-dom'
import { imageInterface, productInterface } from '../../types/interface/index'
import PopupImage from '../../components/product/popupImage/popupImage'
import instance from '../../http/http'


const Productpage: React.FC = () => {
  const params = useParams()
  const [product, setProduct] = useState<productInterface[]>()
  const [image, setImage] = useState<imageInterface[]>()
  const [popupImage, setPopupImage] = useState<boolean>(false)
  const navigateProduct = useNavigate()

  useEffect(() => {
    instance.get(`/api/product/${params.id}`)
    .then(res => setProduct(res.data))
    .catch(err => console.log(err))
  }, [])

  // useEffect(() => {
  //   instance.get(`/api/product/images/${params.id}`)
  //   .then(res => setImage(res.data))
  //   .catch(err => console.log(err))
  // }, [])

  const handleproduct = () => {
    navigateProduct(`/catalog`)
  }

  return (
    <div id='productpage'>
      <Navigation />
      <main id="productpage-main">
        <h1 className="title-product">Produit</h1>
        <div className="container-productpage">
          <div className="container-img-product">
            <img className='img-product-main' src={product && product[0].images} alt={product && product[0].slug} title={product && product[0].title} />
            <div className="undercontainer-image-product">
              {
                image?.map((img) => (
                  <img key={img.id} className='img-product' src={img.src} alt={img.alt} title={img.title} />
                ))
              }
            </div>
          </div>
          <div className="container-description-product">
            <h2 className="title-description-product">{product && product[0].title}</h2>
            <p className="reference-product"><span> Référence produit</span> : {product && product[0].references_product}</p>
            <p className="description-product">{product && product[0].description}</p>
            <p className="price-product">{product && product[0].price} €</p>
            <div className="container-btn-product">
              <button className="btn-product">Ajouter au panier</button>
              <button onClick={() => handleproduct()} className="btn-product">Revenir au catalogue</button>
            </div>
          </div>
        </div>    
      </main>
    </div>
  )
}

export default Productpage