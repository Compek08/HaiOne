const express = require("express");
const { register, login, logout } = require("../controllers/authController");
const { isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.use(isAdmin)
router.get()

module.exports = router;
