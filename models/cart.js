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
                      console.log('toBeAdded',existingItemIndex);
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
                          fs.writeFile(p,JSON.stringify(cart))
                   }
                        
               })
        })
        
        
    }
    static getCartProducts() {

    }
    static getTotalPrice() {

    }
    static getTotalProductCount() {

    }
}