const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const app = express()

app.use(adminRoutes)
app.use(shopRoutes)

app.use(bodyParser.urlencoded({
    extended : false
}))


app.listen(3000)
