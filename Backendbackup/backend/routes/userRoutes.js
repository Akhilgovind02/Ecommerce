const express = require('express')
const {
  signUpUser,
  signInUser,
  getUser,
  getallusers
} = require('../controller/user.controller')
const {verifyUser} = require('../middleware/middleware')
const router = express.Router()

router.post('/signup', signUpUser)
router.post('/signin', signInUser)

router.route('/me').get([verifyUser], getUser)

router.get( '/all' ,getallusers)

module.exports = router
