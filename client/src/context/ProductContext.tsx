import React, { createContext, useState } from 'react'
import instance from '../http/http';
import { ProductContextData } from '../types/interface/index';

interface props {
  children?: React.ReactNode
}

const ProductContext = createContext<ProductContextData>({} as ProductContextData)


const ProductProvider: React.FC<props> = ({ children }) => {

  const [products, setProducts] = useState()
  const [product, setProduct] = useState()

  
  const getAllProducts = async () => {
    await instance.get('/api/product')
    .then((res) => setProducts(res.data))
    .catch((err) => console.log("GET PRODUCT", err))
  }

  const getProduct = async (slug: string | undefined) => {
    await instance.get(`/api/product/${slug}`)
    .then(res => setProduct(res.data))
    .catch(err => console.log(err))
  }


  return (
    <ProductContext.Provider value={{ 
      products: products,
      getAllProducts: getAllProducts,
      getProduct: getProduct,
      product: product
     }}>
      {children}
    </ProductContext.Provider>
  )
}

export { ProductContext, ProductProvider }