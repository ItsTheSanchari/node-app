const express = require('express')
const router = express.Router()
const productController = require('../controllers/products')
const authMiddleWare = require('../middleware/auth')

router.get('/',authMiddleWare,productController.getProductList)
module.exports = router