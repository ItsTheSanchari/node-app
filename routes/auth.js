const express = require('express')
const router = express.Router()
const path = require('path')
const authController = require('../controllers/auth.js')

router.get('/login',authController.getLoginPage)
router.post('/login',authController.signIn)

module.exports = router