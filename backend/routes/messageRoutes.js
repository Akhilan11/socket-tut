const express = require('express')
const router = express.Router()

const { newMessage, getAllMessages } = require('../controller/messageController')

router.get('/', getAllMessages)

router.post('/', newMessage)

module.exports = router