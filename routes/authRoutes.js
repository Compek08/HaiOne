const express = require("express");
const { register, login, logout } = require("../controllers/authController");
const { isAuthenticated } = require("../middlewares/authMiddleware");

const router = express.Router(); // Ensure this is the only declaration of 'router' in this file

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", isAuthenticated, (req, res) => {
  res.json({ message: "You are logged in", user: req.session.user });
});

module.exports = router;
