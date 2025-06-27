const express = require('express')
const protectRoute = require('../middleware/protectRoute')
const { getusers, getmessages, sendmessage } = require('../controllers/messagecontroller')
const router = express.Router()

router.route('/getusers')
       .get(protectRoute,getusers)

router.route('/:id')
       .get(protectRoute,getmessages)

router.route('/send/:id')
       .post(protectRoute,sendmessage)       
       
module.exports = router