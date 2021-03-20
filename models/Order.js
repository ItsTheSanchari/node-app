const mongoose = require('mongoose')
const Schema = mongoose.Schema
const OrderSchema = new Schema({
    products : [ 
        {
            product:{type: Object,required:true},
            quantity:{type:Number,required:true}
        }    
                
    ],
    user : {
        name : {
            type:String,
            required:true
        },
        userId: {
            ref:"User",
            required:true,
            type:Schema.Types.ObjectId

        }
    }

}) 
OrderSchema.methods.generateOrder = function (productDetails) {
    console.log('productDetails',productDetails)
}
module.exports = mongoose.model('Order',OrderSchema)