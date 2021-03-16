const mongoose = require('mongoose')
const Schema = mongoose.Schema
const OrderSchema = new Schema({
    products : [ 
        {
            product:{type: Schema.Types.ObjectId,ref:'Product',required:true},
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
module.exports = mongoose.model('Order',OrderSchema)