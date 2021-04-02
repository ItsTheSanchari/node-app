const express = require('express')
const router = express.Router()
const path = require('path')
const authController = require('../controllers/auth.js')

router.get('/login',authController.getLoginPage)
router.post('/login',authController.signIn)
router.post('/logout',authController.signout)
router.get('/signup',authController.signup)
router.post('/signup',authController.createUser)
router.get('/reset/:token',authController.getNewPassaCreatePage)
router.get('/reset',authController.getPasswordResetPage)
router.post('/reset',authController.resetPassword)
router.post('/editPassword',authController.resetPasswordDb)

module.exports = router