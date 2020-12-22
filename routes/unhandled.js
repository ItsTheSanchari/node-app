const express = require('express')
const router = express.Router()
const path = require('path')
const rootDir = require('../utils/path')
router.use((req,res,next)=> {
    res.status(404).render('404',{
        pageTitle : 'Page Not Found',
        path:null,
    })
})

module.exports = router
