const express = require('express')
const router = express.Router()

const { postMessage, getMessage } = require('../controller/messageController')

router.post("/", postMessage)
router.get("/", getMessage)

module.exports = router