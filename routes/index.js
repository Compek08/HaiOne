const WebController = require('../controllers/webController')
const router = require('express').Router()

router.get("/", WebController.index)

module.exports = router 