const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose')
const session = require('express-session')
const mongoDbStore = require('connect-mongodb-session')(session)
const adminRoute = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const unhandled = require('./routes/unhandled')
const authRoutes = require('./routes/auth')
const flash = require('connect-flash');
const multer = require('multer')
// const csrf = require('csurf');
//model
const User = require('./models/User');
const { error } = require('console');
const app = express()
const URI = 'mongodb+srv://thesanchari:sanchari1234@cluster0.r5sgi.mongodb.net/<test>?retryWrites=true&w=majority'
const store = mongoDbStore({
    uri: URI,
    collection : 'session'
})
// const csrfProtection = csrf();
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'public')))
app.use('/images',express.static(path.join(__dirname,'images')))
app.set('views','views')
app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      store: store
    })
  );

// app.use(csrfProtection);

const filterStorage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,'images') //first arg -> error msg,second -> folder name,
    },
    filename: (req,file,cb) => {
        cb(null,Date.now()+ '-' +file.originalname) //originalname ->so that we end with the extension 
    }
})
const  fileFilter = (req, file, cb) =>{
    if(file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
    
  }
app.use(multer({
    storage:filterStorage,
    fileFilter:fileFilter
}).single('imageUrl'))
app.use(flash())

app.use(bodyParser.urlencoded({
    extended : false
}))

app.use((req,res,next)=> {
    // let token = req.csrfToken();
    // // res.header('XSRF-TOKEN', token);
    res.locals.isLoggedIn = req.session.isLoggedIn
    // res.locals.csrfToken = req.csrfToken();
    // res.cookie('XSRF-TOKEN', req.csrfToken());
    // // console.log('body',req.body)
    next()
})
app.use('/admin',adminRoute)
app.use(shopRoutes)
app.use(authRoutes)
app.use(unhandled)
mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(result => {
    app.listen(3000)
    
}).catch(err => {
    console.log('error while connecting',error)
})

