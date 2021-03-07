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
        console.log('product....',product)
        const cartProductIndex =  this.cart && this.cart.items ? this.cart.items.findIndex((item) => {
            return item.productId.toString() === product._id.toString() 
        }) : -1
        console.log('cartProductIndex',cartProductIndex)
        const updatedCartItems = this.cart.items ? [...this.cart.items] : []  
        if(cartProductIndex > -1) {
            updatedCartItems[cartProductIndex].quantity = this.cart.items[cartProductIndex].quantity +1;
        } else {
            updatedCartItems.push({productId:new mongoDb.ObjectId(product._id),quantity:1})
        }
        const updatedCart = {
            items: updatedCartItems
        }
        return client.db('shop').collection('User').updateOne(
            {_id : this._id},
            {$set: {cart:updatedCart}}
            )
    }
    getAllCartData() {
        console.log('all data',this.cart)
        let cartProductIds = this.cart && this.cart.items? this.cart.items.map(eachItem => {
            return new mongoDb.ObjectId(eachItem.productId)
        }) : []
       console.log('ids',cartProductIds)
       return client.db('shop').collection('products').find({ _id: { $in: cartProductIds } })
       .toArray()
       .then((products)=>{
           console.log('products',products)
           return products.map(eachProduct => {
               return {
                   ...eachProduct,quantity:this.cart.items.find(eachItem => {
                    return eachItem.productId.toString() === eachProduct._id.toString()
                   }).quantity
               }
           })
       })
       .catch((error) => {
           console.log('error',error)
       })
    }
    removeCartProduct(productId) {
        let updatedCartItems = [...this.cart.items]
        let modifiedCartItems = []
        updatedCartItems.map(eachItem => {
            if(eachItem.productId.toString() === productId.toString()) {
                    eachItem.quantity = eachItem.quantity-1
            }
        })
        modifiedCartItems =  updatedCartItems.filter(eachItem => {
            return parseInt(eachItem.quantity)!=0
        })
        const updatedCart = {
            items: modifiedCartItems
        }
        console.log('cart',updatedCart)
        return client.db('shop').collection('User').updateOne(
            {_id : this._id},
            {$set: {cart:updatedCart}}
            )
    }
    generateOrder() {
        let orderItems = {
            userId : this._id,
            userEmail: this.email,
            items :[]
        }

     return this.getAllCartData().then(data => {
          return orderItems.items = data
          
      }).then(result => {
          return client.db('shop').collection('order').insertOne(orderItems).then(result => {
              return client.db('shop').collection('User').updateOne(
                  {_id : this._id},
                {$set: {cart:{}}
              })
          })
      } ).catch( error => {
          console.log()
      })
    }

    getOrder(){
        return client.db('shop').collection('order').find({
            userId : new mongoDb.ObjectId(this._id)
        }).toArray()
    }

}
module.exports = User