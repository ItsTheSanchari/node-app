const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./utils/database');
const adminRoute = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const cartRoutes = require('./routes/cart')
const unhandled = require('./routes/unhandled')

//models
const Product = require('./models/prouct')
const User = require('./models/User')
const Cart = require('./models/Cart')
const CartItem = require('./models/Cart-Item')
const Order = require('./models/Order')
const OrderItem = require('./models/Order-Items')

const app = express()
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'public')))
app.set('views','views')
app.use(bodyParser.urlencoded({
    extended : false
}))
app.use((req,res,next)=>{
    User.findByPk(1)
    .then((user) => {
        req.user = user
        next()
    })
    .catch(err => {
        console.log('error while fetching an user',err)
    })
})
app.use('/admin',adminRoute)
app.use(shopRoutes)
app.use(unhandled)
Product.belongsTo(User,{
    constraints:true,
    onDelete:'CASCADE'
})
User.hasMany(Product)
// User cart relationship
User.hasOne(Cart)
Cart.belongsTo(User)

// Cart and Product relationship
Cart.belongsToMany(Product, {
    through: CartItem
})
Product.belongsToMany(Cart, {
    through: CartItem
})
//user order relationship
User.hasMany(Order)
Order.belongsTo(User)

Order.belongsToMany(Product,{
    through : OrderItem
})
sequelize.sync().then((result)=>{
    User.findByPk(1).then((user) => {
        if(!user) {
            User.create({
                name:'sanchari',
                email:'sanchari678@gmail.com'
            })
        } 
        return user;
    })
    .then((user) => {
        app.listen(3000)
        
    })
    .catch((err) => {
        console.log('error while creating dummy user',err)
    })
   
}).catch((err)=>{
    console.log('error occurred while tring to sync',err)
})

