import React, { useEffect, useState } from "react"
import Navigation from "../../components/navigation/Navigation"
import Card from "../../components/catalog/card/Card"
import { categoryInterface, imageInterface, productInterface } from '../../types/interface/index'
import instance from '../../http/http';
import { useNavigate } from "react-router-dom";

const Catalogpage: React.FC = () => {
  
  const [products, setProducts] = useState<productInterface[]>()
  const [category, setCategory] = useState<categoryInterface[]>()
  const [images, setImages] = useState<imageInterface[]>()
  const [user, setUser] = useState<boolean>(false)

  const navigate = useNavigate();


  useEffect(() => {
    instance.get('/api/product/category')
    .then((res) => setCategory(res.data))
    .catch((err) => console.log("GET CATEGORY", err))
  }, [])
  
  useEffect(() => {
    instance.get('/api/product')
    .then((res) => setProducts(res.data))
    .catch((err) => console.log("GET PRODUCT", err))
  }, [])
  
  useEffect(() => {
    instance.get('/api/auth/me').then(res => {
      if(res.data) {
        setUser(true)
        console.log('Vous êtes connecté')
      } else {
        setUser(false)
        console.log('Vous n\'êtes pas connecté')
      }
    }).catch(err => {
      if (err.response && err.response.status === 401) {
        console.log("Vous n'êtes pas connecté")
        navigate('/authentification')
      } else {
        console.log("Erreur lors de la récupération de l'utilisateur connecté : ", err)
      }
    })
  }, [])

  return (
    <div id="catalogpage">
      <Navigation />
      <main id="catalogpage-main">
        <h1 className="title-catalog">Nos Produits {user ? "Connecté" : "Non connecté" }</h1>

        <div className="container-catalog">
          {
            category?.map((cat) => (
              cat.activation &&
                <div key={cat.id} className="container-card">
                  {
                    products?.map((product) => (
                      product.category_id.toString() === cat.id.toString() && product.activation ?
                        <Card key={product.id}
                          id={product.id}
                          title={product.title}
                          price={product.price}
                          reduction={product.reduction}
                          description={product.description}
                          category_id={product.category_id}
                          references_product={product.references_product}
                          activation={product.activation}
                          slug={product.slug}
                          images={product.images}
                        /> : null
                    ))
                  }
                </div>
            ))
          }
        </div>
      </main>
    </div>
  );
};

export default Catalogpage;
