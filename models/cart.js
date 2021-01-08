const fs = require('fs')
const path = require('path')
const extractFileData = require('../helper/extractFileData')
const cartProducts = []
const p = path.join(path.dirname(require.main.filename),'data','cart.json')
const getCartData = cb => {
    fs.readFile(p,(err,content) => {
        if(err) {
            cb([])
        } else {
            cb(JSON.parse(content))
        }
    })
}
module.exports = class Cart {

    constructor(productId) {
        this.productId = productId
        
    }
    static addProductToCart() {
        extractFileData.getFileData('products.json','data',allProducts => {
            console.log('allProducts',allProducts)
        })
    }
    static getCartProducts() {

    }
    static getTotalPrice() {

    }
    static getTotalProductCount() {

    }
}