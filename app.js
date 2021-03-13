const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose')
const adminRoute = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const unhandled = require('./routes/unhandled')

const User = require('./models/User');
const { error } = require('console');
const app = express()
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'public')))
app.set('views','views')
app.use(bodyParser.urlencoded({
    extended : false
}))
app.use((req,res,next)=>{
    User.findById('6044d53aeacb704978a51c4f').then((user)=>{
        console.log('user details',user)
        req.user = user
        next()
    }).catch(error => {
        
    })
})
app.use('/admin',adminRoute)
app.use(shopRoutes)
app.use(unhandled)
mongoose.connect('mongodb+srv://thesanchari:sanchari1234@cluster0.r5sgi.mongodb.net/<test>?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
.then(result => {
    // const user = new User({
    //     name:'sanchari',
    //     email:'sanchari@gmail.com',
    //     cart : {
    //         items:[]
    //     }
    // }).save().then(User=> {
        app.listen(3000)
    // }).catch(error => {
    //     console.log('error while creating',error)
    // })
    
}).catch(err => {
    console.log('error while connecting',error)
})

