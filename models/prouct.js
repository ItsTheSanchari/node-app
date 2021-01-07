const path = require('path')
const fs = require('fs')
const products = [];
const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'products.json'
    )
//helper function
const getProductsFromFile = cb => {
    
    fs.readFile(p,(err,content)=>{
        if(err) {
            cb([])
        } else {
            cb(JSON.parse(content))
        }
        
    })
}
module.exports = class Product {
    constructor(details) {
        this.title = details.title;
        this.path = details.path
        this.description = details.description
    }
    
    saveProduct() {
        //using arrow function so this doesnt lose its context
        getProductsFromFile((products)=>{
            this.id = products.length+1 
            products.push(this)
            fs.writeFile(p,JSON.stringify(products),(err)=>{
                if(err) console.log('error',err)
                
            })
        })
            

    }

    static fetchAllProducts(cb) {
       getProductsFromFile(cb)
        
    }
    static deleteProduct() {
        getProductsFromFile((products)=>{
            
        })
    }
    static getProductById(id,cb) {
        getProductsFromFile(products => {
            const fetchedProduct = products.find(product => product.id == id)
            cb(fetchedProduct)
        })
    }
}