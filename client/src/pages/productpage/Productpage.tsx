import React, {useEffect, useState} from 'react'
import Navigation from '../../components/navigation/Navigation'
import Card from '../../components/product/Card'
import axios from 'axios'
import { productState } from '../../types/interface/index';

const Productpage: React.FC = () => {

  const [product, setProduct] = useState<productState[]>()

  useEffect(() => {
    axios.get('/api/product').then((response) => {
      setProduct(response.data)
      console.log(product);
    }).catch((error) => {
      console.log(error);
    })
  }, [])
  
  return (
    <div id='productpage'>
      <Navigation />
      <main id="productpage-main">
        <h1 className="title-product">Nos Produits</h1>
        <div className="container-product">
            {
              product !== undefined ? product.map(product => (
                <Card 
                  key={product.id}
                
                />
              )) : null
            }
        </div>
      </main>
    </div>
  )
}

export default Productpage