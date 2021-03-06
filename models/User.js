const client = require('../utils/database')
const mongoDb = require('mongodb')
const Product = require('./product')
class User {
    constructor(userName, email, _id,cart) { 
        this.userName = userName
        this.email = email
        this._id = _id ? new mongoDb.ObjectId(_id) :  null
        this.cart = cart ? cart : {}
    }
    save() {
        return client.db('shop').collection('User').findOne({
            email: this.email
        }).then(UserFound => {
            if (!UserFound) {
                return client.db('shop').collection('User').insertOne({
                    userName: this.userName,
                    email: this.email
                }).then((userCreated) => {
                    console.log('userCreated', userCreated)
                    return userCreated
                }).catch(error => {
                    console.log('error', error)
                })
            }
        }).catch(error => {
            console.log('error occurred', error)
        })


    }
    static findById(userId) {
        return client.db('shop').collection("User").findOne({
            _id: new mongoDb.ObjectId(userId)
        })
    }
    addToCart(product) {

        const cartProductIndex = this.cart.items.findIndex((item) => {
            return item.productId.toString() == product._id.toString() 
        })
        const updatedCartItems = [...this.cart.items]    
        if(cartProductIndex > -1) {
            updatedCartItems[cartProductIndex].quantity = this.cart.items[cartProductIndex].quantity +1;
        } else {
            updatedCartItems.push({productId:new mongoDb.ObjectId(product._id),quantity:quantity})
        }
        const updatedCart = {
            items: updatedCartItems
        }
        console.log('updatedCart',updatedCart)
     
        return client.db('shop').collection('User').updateOne(
            {_id : this._id},
            {$set: {cart:updatedCart}}
            )
    }

}
module.exports = User