const router = require('express').Router()

router.get("/", (_, res) => res.redirect("/stores"))

module.exports = router 