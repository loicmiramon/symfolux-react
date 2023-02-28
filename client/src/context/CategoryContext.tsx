import React, { createContext, useState, useEffect } from 'react'
import instance from '../http/http';
import { CategoryContextData } from '../types/interface';

interface props {
  children?: React.ReactNode
}

const CategoryContext = createContext<CategoryContextData>({} as CategoryContextData)


const CategoryProvider: React.FC<props> = ({ children }) => {

  const [categories, setCategories] = useState()

  
  const getAllCategories = async () => {
    instance.get('/api/product/category')
      .then((res) => setCategories(res.data))
      .catch((err) => console.log("GET CATEGORY", err))
  }


  return (
    <CategoryContext.Provider value={{ 
      categories: categories,
      getCategories: getAllCategories
     }}>
      {children}
    </CategoryContext.Provider>
  )
}

export { CategoryContext, CategoryProvider }