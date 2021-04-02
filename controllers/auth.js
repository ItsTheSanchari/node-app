const session = require("express-session")
const User = require("../models/User")
const bcrypt = require('bcrypt')
const nodeMailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const transporter = nodeMailer.createTransport(sendgridTransport({
   auth: {
    api_key:'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'
   }
}))
exports.signup = (req,res,next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }
    res.render('auth/signup',{
        path:'/signup',
        pageTitle :'Signup Page',
        isLoggedIn:false,
        errorMessage: message
    })
}
exports.createUser = (req,res,next) => {
    const email = req.body.email
    const name = req.body.fullname
    const pass = req.body.password
    const saltRounds = 10;
    console.log(name)
    User.findOne({
        email : email
    }).then((userFound) => {
        if(!userFound) {
            bcrypt.hash(pass, saltRounds).then(function(hashedPass) {
                const user = new User({
                    email: email,
                    password:hashedPass,
                    name: name,
                    cart : {
                        items : []
                    }
                })
                return user.save()
            }).then((createdUser) =>{
                req.user = createdUser
                 req.session.user = createdUser
                 req.session.isLoggedIn = true
                 return req.session.save()
            }).then(() => {
                res.redirect('/')
                return transporter.sendMail( {
                    to:email,
                    from:'sanchari678@gmail.com',
                    subject:'Successful Signup',
                    html:'<h1>You have successfully siggned up!!</h1>'
                })
               
            }).catch((err)=> {
                console.log('error while signing up',err)
            })
        }
        else {
            res.redirect('/login')
        }
    }).catch((err) => {
        console.log('error while fetching user',err)
    })
    
}
exports.getLoginPage = (req,res,next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }
    res.render('auth/login',{
        path:'/login',
        pageTitle :'Login Page',
        isLoggedIn:req.session.isLoggedIn,
        errorMessage: message
    })
}
exports.signIn = (req, res, next) => {
    const email = req.body.email
    const pass = req.body.password
    const saltRounds = 10;
    let userDetails = null
   User.findOne({
            email: email,
    }).then((userFound) => {
        userDetails = userFound
        console.log('inside',userDetails)
        if(!userFound) {
            req.flash('error', 'Invalid email or password.');
           return res.redirect('/')
        } 
        bcrypt.compare(pass, userFound.password).then((matched) => {
          if(!matched) {
            req.flash('error', 'Invalid email or password.');
           return res.redirect('/login')
          } else {
            req.user = userFound
            req.session.user = userFound
            req.session.isLoggedIn = true
            return req.session.save(err => {
                console.log('err while login',err)
                return res.redirect('/')
            })
          }})    
        })
        .catch((err) => {

        })

}
exports.getPasswordResetPage = (req,res,next) => {
    res.render('auth/reset-pass',{
        path:'/reset',
        pageTitle :'Reset Password Page',
        isLoggedIn:false,
        errorMessage: null
    })
}
exports.signout = (req,res,next) => {
    console.log(req.body)
    req.session.destroy((err) => {
        console.log('error while destroying an event')
        res.redirect('/')
    })
}


