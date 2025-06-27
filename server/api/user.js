const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const protectRoute = require('../middleware/protectRoute')

router.route('/checkAUth')
        .get(protectRoute,userController.checkAuth)

router.route('/signup')
        .post(userController.signup)

router.route('/login')
        .post(userController.login)       

router.route('/logout')
        .post(userController.logout)           

router.route('/updateprofile')
        .post(protectRoute,userController.updateprofile)
module.exports = router        