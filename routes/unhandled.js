const express = require('express')
const router = express.Router()
const path = require('path')
const rootDir = require('../utils/path')
router.use((req,res,next)=> {
    // res.status(404).send('<h1>Page not found</h1>')
    // res.status(404).sendFile(path.join(__dirname,'../','views','404.html'))
    // res.status(404).sendFile(path.join(rootDir,'views','404.html'))
    res.status(404).render('404',{
        pageTitle : 'Page Not Found'
    })
})

module.exports = router
