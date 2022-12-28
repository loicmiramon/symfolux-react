const express = require('express')
const router = express.Router()
const { 
  postAuthSignUp, 
  postAuthSignIn, 
  postAuthLogout,
  putAuth
} = require('../controllers/auth-controllers')
const { 
  getAllProduct, 
  postProduct, 
  putProduct, 
  delProduct, 
  getProduct 
} = require('../controllers/product-controllers')

// Product
router.get('/api/product', getAllProduct)
router.get('/api/product/:id', getProduct)
router.post('/api/product/new', postProduct)
router.put('/api/product/update/:id', putProduct)
router.delete('/api/product/delete/:id', delProduct)

// Authentification
router.post('/api/auth/register', postAuthSignUp)
router.post('/api/auth/login', postAuthSignIn)
router.post('/api/auth/logout', postAuthLogout)
router.put('/api/auth/update/:id', putAuth)
router.delete('/api/auth/delete/:id', delProduct)

module.exports = router