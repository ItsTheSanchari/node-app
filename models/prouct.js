const path = require('path')
const fs = require('fs')
const db = require('./../utils/database')
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
        return db.execute('INSERT INTO products (title,price,description) VALUES (?,?,?)',[
            this.title,
            300,
            this.description
        ])
        //using arrow function so this doesnt lose its context

        // getProductsFromFile((products)=>{
        //     this.id = products.length+1 
        //     products.push(this)
        //     fs.writeFile(p,JSON.stringify(products),(err)=>{
        //         if(err) console.log('error',err)
                
        //     })
        // })
            

    }

    static fetchAllProducts() {
    //    getProductsFromFile(cb)
    return db.execute('SELECT * FROM products')
        
    }
    static deleteProduct() {
        getProductsFromFile((products)=>{
            
        })
    }
    static getProductById(id) {
        return db.execute('SELECT * FROM products where products.id=?',[id])
        // getProductsFromFile(products => {
        //     const fetchedProduct = products.find(product => product.id == id)
        //     cb(fetchedProduct)
        // })
    }
    static removeProductById(id,cb) {
        getProductsFromFile(fetchedProduct => {
            let updatatedProduct = fetchedProduct.filter(eachProduct => eachProduct.id != id )
            fs.writeFile(p,JSON.stringify(updatatedProduct),(err)=>{
                if(err) console.log('error',err)
            })
            cb(updatatedProduct)
        })
    }
}