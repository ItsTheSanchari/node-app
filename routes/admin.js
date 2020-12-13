const express = require('express')
const path = require('path')
const router = express.Router();
const rootDir = require('../utils/path')

const product = []

router.get('/add-product',(req,res,next)=>{
    // res.send('<html><body><form action="/admin/product" method="POST"><input type="text" name="data"></input><button type="submit">submit</button></form></body></html>')
    res.sendFile(path.join(rootDir,'views','add-product.html'))
})
router.post('/add-product',(req,res,next)=>{
    this.product.push({
        title: req.body.title
    })
    res.redirect('/')
})
// module.exports = router
exports.routes = router
exports.product = product
