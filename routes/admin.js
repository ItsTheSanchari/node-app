const express = require('express')
const path = require('path')
const router = express.Router();
const productController = require('../controllers/products')

const product = []

router.get('/add-product',productController.getAddProductPage)
router.post('/add-product',productController.addProduct)
router.post('/product-details/edit',productController.editProduct)
router.post('/product-details/edit/submit',productController.editProductDb)
router.get('/product-details/:productId',productController.getProductDetails)
router.get('/delete/product/:productId',productController.removeProduct)

//cart routes

router.post('/product-details/cart/add',productController.addProductToCart)
router.get('/cart',productController.getAllCartData)
router.post('/cart-delete-item',productController.removeCartProduct)

//order
router.get('/orders',productController.getOrders)
router.post('/order',productController.createOrder)
module.exports = router
