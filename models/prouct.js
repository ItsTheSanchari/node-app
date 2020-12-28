const path = require('path')
const fs = require('fs')
const products = [];

module.exports = class Product {
    constructor(details) {
        this.title = details.title;
        this.path = details.path
    }

    saveProduct() {
        // products.push(this);
        const p = path.join(
            path.dirname(require.main.filename),
            'data',
            'products.json'
            )
        fs.readFile(p,(err,content) => {
            let products = []
            if(!err) {
                products = JSON.parse(content)
            }
            products.push(this)
            fs.writeFile(p,JSON.stringify(products),(err)=>{
                console.log(err)
            })
        })

    }

    static fetchAllProducts(cb) {
        let data = []
        const p = path.join(
            path.dirname(require.main.filename),
            'data',
            'products.json'
            )
        fs.readFile(p,(err,content)=>{
            if(err) {
                cb([])
            } 
            cb(JSON.parse(content))
        })
        
    }
}