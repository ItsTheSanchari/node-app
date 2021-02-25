const client = require('../utils/database')
const mongoDb = require('mongodb')
class Product {
    constructor(title,price,description,imgUrl,id) {
        this.title = title
        this.price = price
        this.description = description
        this.imgUrl = imgUrl
        this._id = id ? new mongoDb.ObjectId(id) : null
    }
    save(productId = null) {
        if (productId) {
            return client.db('shop').collection('products').updateOne({
                _id : new mongoDb.ObjectId(productId)
            },{$set : {
                title:this.title,
                price:this.price,
                description:this.description,
                imgUrl:this.imgUrl
            }}.next()
            ).then((result) => {
                return result;
            })
            .catch((err)=> {
                console.log('error while updating a product',err)
            })
        } else {
            console.log('voila')
            return client.db('shop').collection('products').insertOne({
                title: this.title,
                proce:this.price,
                description:this.description,
                imgUrl:this.imgUrl
            })
                .then(result => {
                    console.log('result', result)
                })
                .catch(error => {
                    console.log('error', error)
                })
        }

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
    static getProductDetails(productId) {
        return client.db('shop').collection('products').find({
            _id:new mongoDb.ObjectId(productId)
        })
        .next()
        .then((result) => {
            return result
        })
        .catch(error => {
            console.log('error while fetching a product',error)
        })
    }
    static deleteById(productId) {
        return client.db('shop').collection('products').deleteOne({
            _id:new mongoDb.ObjectId(productId)
        }).then(()=>{
            console.log('deleted')
        }).catch(error => {
            console.log('error occurred while deleting',error)
        })
    }
}

module.exports = Product