const fs = require('fs')
const path = require('path')
const extractFileData = require('../helper/extractFileData')
const p = path.join(path.dirname(require.main.filename),'data','cart.json')
module.exports = class Cart {
      
    constructor() {      
        
    }
    static addProductToCart(id) {
        let productPath = path.join(path.dirname(require.main.filename),'data','products.json')
        fs.readFile(p,(err,cartContent) => {
           let cart = JSON.parse(cartContent)
           let existingItemIndex = cart.findIndex(eachItem => eachItem.id == id)
               fs.readFile(productPath,(prodErr,allProducts) => {
                   if(!prodErr) {
                      let products = JSON.parse(allProducts)
                      let toBeAdded = products.find(eachProduct => eachProduct.id == id)
                      console.log('index',existingItemIndex);
                      let Newcart = [...cart]
                          if(existingItemIndex == -1) {
                            let productObj = {...toBeAdded}
                            productObj.quantity = 1;
                            Newcart.push(productObj)
                            cart = [...Newcart]
                            
                          } if(existingItemIndex >= 0 ) {
                              let updatedProduct = cart[existingItemIndex];
                              updatedProduct.quantity = updatedProduct.quantity+1;
                               cart[existingItemIndex] = updatedProduct
                          }
                          console.log('cart data',cart)
                          fs.writeFile(p,JSON.stringify(cart),(err)=>{
                            if(err) console.log('error',err)
                        })
                   }
                        
               })
        })
        
        
    }
    static getCartProducts() {
        fs.readFile(p,(err,content)=> {
            if(err) {
                cb([])
            } else {
                cb(JSON.parse(content))
            }
        })
    }
    static getTotalPrice() {

    }
    static getTotalProductCount() {

    }
}