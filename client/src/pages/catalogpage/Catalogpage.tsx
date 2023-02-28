import React, { useEffect, useState, useContext } from "react"
import Navigation from "../../components/navigation/Navigation"
import Card from "../../components/catalog/card/Card"
import { imageInterface } from '../../types/interface/index'
import { AuthContext } from "../../context/UserContext";
import { CategoryContext } from "../../context/CategoryContext";
import { ProductContext } from "../../context/ProductContext";

const Catalogpage: React.FC = () => {
  
  const [images, setImages] = useState<imageInterface[]>()

  const { detectUser, isUserConnected, user } = useContext(AuthContext)
  const { categories, getCategories } = useContext(CategoryContext) 
  const { products, getAllProducts } = useContext(ProductContext)


  useEffect(() => {
    getCategories()
  }, [categories])
  
  useEffect(() => {
    getAllProducts()

  }, [products])
  
  useEffect(() => {
    detectUser()
  }, [ isUserConnected])

  return (
    <div id="catalogpage">
      <Navigation />
      <main id="catalogpage-main">
        <h1 className="title-catalog">Nos Produits</h1>
        <div className="container-catalog">
          {
            categories?.map((cat) => (
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
