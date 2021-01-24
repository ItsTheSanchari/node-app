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
sequelize.sync().then((result)=>{
   app.listen(3000)
}).catch((err)=>{
    console.log('error occurred while tring to sync',err)
})

