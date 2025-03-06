const express = require("express");
const { register, login, logout } = require("../controllers/authController");
const { isAuthenticated } = require("../middlewares/authMiddleware");

const router = express.Router();

module.exports = router;
