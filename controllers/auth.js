exports.getLoginPage = (req,res,next) => {
    res.render('auth/login',{
        path:'/login',
        pageTitle :'Login Pgae',
        isLoggedIn:req.isLoggedIn
    })
}
exports.signIn = (req,res,next) => {
    req.session.isLoggedIn = true
    res.redirect('/')
}