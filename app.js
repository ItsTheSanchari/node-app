const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const adminRoute = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const userModel = require('./models/User')
const client = require('./utils/database');
const User = require('./models/User');
const app = express()
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'public')))
app.set('views','views')
app.use(bodyParser.urlencoded({
    extended : false
}))
app.use((req,res,next)=>{
    userModel.findById('603a525572f96706984b4eea').then((user)=>{
        req.user = new User(user.userName,user.email,user._id,user.cart)
    }).catch(error => {
        
    })


    // let userName ='Sanchari'
    // let email = 'sancharii@gmail.com'
    // const User = new userModel(userName, email)
    // User.save().then((data) => {
    //     console.log('what did we get',data)
    // }).catch(err => {
    //     console.log('error occurred while creating user')
    // })
    next()
})
app.use('/admin',adminRoute)
app.use(shopRoutes)
// app.use(unhandled)
client.connect(() => {
    app.listen(3000)
    console.log('listening 3000')
})

