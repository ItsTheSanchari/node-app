const express = require('express')
const router = express.Router()
const errorController = require('../controllers/404')
router.use(errorController.unhandled)

module.exports = router
