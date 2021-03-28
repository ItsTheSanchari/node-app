const session = require("express-session")
const User = require("../models/User")
const bcrypt = require('bcrypt')

exports.signup = (req,res,next) => {
    res.render('auth/signup',{
        path:'/signup',
        pageTitle :'Signup Pgae',
        isLoggedIn:false
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
    res.render('auth/login',{
        path:'/login',
        pageTitle :'Login Pgae',
        isLoggedIn:req.session.isLoggedIn
    })
}
exports.signIn = (req,res,next) => {
    req.session.user = req.user
    req.session.isLoggedIn = true
    req.session.save((err)=> {
        res.redirect('/')    
    })
}
exports.signout = (req,res,next) => {
    req.session.destroy((err) => {
        console.log('error while destroying an event')
        res.redirect('/')
    })
}


