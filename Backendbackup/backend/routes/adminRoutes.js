const express = require('express')
const {
  signUpAdmin,
  signInAdmin,
  getAdmin,
} = require('../controller/admin.controller')
const {verifyAdmin} = require('../middleware/middleware')
const router = express.Router()

router.post('/signupadmin', signUpAdmin)
router.post('/signinadmin', signInAdmin)

router.route('/me').get([verifyAdmin], getAdmin)

module.exports = router;
