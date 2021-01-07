const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const adminRoute = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const unhandled = require('./routes/unhandled')


const app = express()
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'public')))
app.set('views','views')
app.use(bodyParser.urlencoded({
    extended : false
}))

app.use('/admin',adminRoute)
app.use(shopRoutes)
app.use(unhandled)

app.listen(3000)
