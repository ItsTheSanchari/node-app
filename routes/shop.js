const express = require('express')
const router = express.Router()
const path = require('path')
const rootDir = require('../utils/path')
const admin = require('./admin')

router.get('/',(req,res,next)=>{
    // res.send('<h1>Hello from the other world</h1>')
    // res.sendFile('../views/shop.html')
    // res.sendFile(path.join(__dirname,'../','views','shop.html'))
    console.log('product list',admin.product)
    // res.sendFile(path.join(rootDir,'views','shop.html'))
    res.status(200).render('shop',{
        products : admin.product
    })
})
module.exports = router