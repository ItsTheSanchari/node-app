const express = require('express')
const router = express.Router()
const path   = require('path')
const productController = require('../controllers/products')

router.post('/add-product',(req,res,next) => {
    console.log('voila')
})
module.exports = router