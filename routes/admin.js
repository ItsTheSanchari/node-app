const express = require('express')
const path = require('path')
const router = express.Router();
const productController = require('../controllers/products')
const authMiddleWare = require('../middleware/auth')
const product = []

router.get('/add-product',authMiddleWare,productController.getAddProductPage)
router.post('/add-product',authMiddleWare,productController.addProduct)
router.get('/product-details/:productId',authMiddleWare,productController.getProductDetails)
router.get('/products',authMiddleWare,productController.getProductList)
router.post('/product-details/edit',authMiddleWare,productController.editProduct)
router.post('/product-details/edit/submit',authMiddleWare,productController.editProductDb)

router.get('/delete/product/:productId',authMiddleWare,productController.removeProduct)

//cart routes

router.post('/product-details/cart/add',authMiddleWare,productController.addProductToCart)
router.get('/cart',authMiddleWare,productController.getAllCartData)
router.post('/cart-delete-item',authMiddleWare,productController.removeCartProduct)

// //order
router.get('/orders',authMiddleWare,productController.getOrders)
router.post('/order',authMiddleWare,productController.createOrder)
module.exports = router

