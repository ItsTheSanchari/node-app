const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose')
const adminRoute = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const app = express()
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'public')))
app.set('views','views')
app.use(bodyParser.urlencoded({
    extended : false
}))
app.use('/admin',adminRoute)
app.use(shopRoutes)
// app.use(unhandled)
mongoose.connect('mongodb+srv://thesanchari:sanchari1234@cluster0.r5sgi.mongodb.net/<test>?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
.then(result => {
    app.listen(3000)
}).catch(err => {
    console.log('error while connecting')
})

