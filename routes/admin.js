const express = require('express')
const path = require('path')
const router = express.Router();
const productController = require('../controllers/products')

const product = []

router.get('/add-product',productController.getAddProductPage)
router.post('/add-product',productController.addProduct)
module.exports = router
