const express = require('express')
const router = express.Router()
const { 
  postAuthSignUp, 
  postAuthSignIn, 
  postAuthLogout,
  postAdressDelivery,
  putAuth,
  postAdressFacturation,
  getAuth,
  postRefreshToken,
  getAuthRefreshToken
} = require('../controllers/auth-controllers')
const { 
  getAllProduct, 
  postProduct, 
  putProduct, 
  delProduct, 
  getProduct, 
  getAllCategory,
  postImagesProduct,
  postMaterial,
  postMaterialProduct,
  postCategoriesProduct,
  postSizeProduct,
  getAllImagesProduct
} = require('../controllers/product-controllers')

const { logoutMiddleware, authenticateTokenMiddleware } = require('../middleware/auth')

// Product

router.get('/api/product', getAllProduct)
router.get('/api/product/category', getAllCategory)
router.get('/api/product/images', getAllImagesProduct)
router.get('/api/product/:id', getProduct)
router.post('/api/product/new/product', postProduct)
router.post('/api/product/new/categories', postCategoriesProduct)
router.post('/api/product/new/images', postImagesProduct)
router.post('/api/product/new/material', postMaterial)
router.post('/api/product/new/meterial-product', postMaterialProduct)
router.post('/api/product/new/size', postSizeProduct)

router.put('/api/product/update/:id', putProduct)
router.delete('/api/product/delete/:id', delProduct)

// Authentification
router.post('/api/auth/register', postAuthSignUp)
router.post('/api/auth/login', postAuthSignIn)
router.post('/api/auth/logout', postAuthLogout)
router.post('/api/auth/delivery', postAdressDelivery)
router.post('/api/auth/facturation', postAdressFacturation)
router.get('/api/auth/refresh-token', getAuthRefreshToken)
router.get('/api/auth/me', authenticateTokenMiddleware, getAuth)
router.put('/api/auth/update/:id', putAuth)
router.delete('/api/auth/delete/:id', delProduct)

module.exports = router