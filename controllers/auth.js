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