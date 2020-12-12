const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const unhandled = require('./routes/unhandled')


const app = express()

app.use(adminRoutes)
app.use(shopRoutes)
app.use(unhandled)

app.use(bodyParser.urlencoded({
    extended : false
}))


app.listen(3000)
