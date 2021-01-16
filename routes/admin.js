const express = require('express')
const path = require('path')
const router = express.Router();
const productController = require('../controllers/products')

const product = []

router.get('/add-product',productController.getAddProductPage)
router.post('/add-product',productController.addProduct)
router.get('/product-details/:productId',productController.getProductDetails)
router.get('/delete/product/:productId',productController.removeProduct)
router.post('/product-details/cart/add',productController.addProductToCart)
module.exports = router
