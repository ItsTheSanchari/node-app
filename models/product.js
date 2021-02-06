const client = require('../utils/database')
class Product {
    constructor(title,price,description,imgUrl) {
        this.title = title
        this.price = price
        this.description = description
        this.imgUrl = imgUrl
    }
    save()  {
        return client.db('shop').collection('products').insertOne(this)
        .then(result => {
            console.log('result',result)
        })
        .catch(error => {
            console.log('error',error)
        })
    }

    static getProductList() {
        return client.db('shop').collection('products').find() //returns cursor upto this
        .toArray()
        .then((products)=>{
            return products
        })
        .catch((error)=>{
            console.log('error',error)
        })
    }
}

module.exports = Product