const express = require('express');
const router = express.Router();
const {authController} = require('../controller/index')
const {registerUser,loginUser,logoutUser,refreshUserToken}  = authController
const authenticate = require('../middleware/auth.middleware')


router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/logout', authenticate,logoutUser)
router.post('/refresh', refreshUserToken)

module.exports = router