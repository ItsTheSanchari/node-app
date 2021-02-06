const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const sequelize = require('./utils/database');
const adminRoute = require('./routes/admin')
const shopRoutes = require('./routes/shop')
// const cartRoutes = require('./routes/cart')
// const unhandled = require('./routes/unhandled')

const client = require('./utils/database')
const app = express()
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'public')))
app.set('views','views')
app.use(bodyParser.urlencoded({
    extended : false
}))
app.use((req,res,next)=>{
    next()
})
app.use('/admin',adminRoute)
app.use(shopRoutes)
// app.use(unhandled)
client.connect(() => {
    app.listen(3000)
    console.log('listening 3000')
})

