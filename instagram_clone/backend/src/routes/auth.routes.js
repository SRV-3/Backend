const express = require('express')
const authRouter = express.Router()
const authController = require('../controllers/auth.controller')
const identify = require('../middleware/auth.middleware')

authRouter.post('/register', authController.registerController)

authRouter.post('/login', authController.loginController)

authRouter.get('/getme',identify,authController.getMeController)

module.exports = authRouter