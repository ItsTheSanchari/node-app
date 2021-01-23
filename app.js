const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./utils/database');
const adminRoute = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const cartRoutes = require('./routes/cart')
const unhandled = require('./routes/unhandled')


const app = express()
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'public')))
app.set('views','views')
app.use(bodyParser.urlencoded({
    extended : false
}))
// db.execute('SELECT * FROM products').then(result=> {
//     console.log('result',result)
// }).catch((err)=> {
//     console.log('err',err)
// })
app.use('/admin',adminRoute)
app.use(shopRoutes)
app.use(unhandled)

app.listen(3000)
