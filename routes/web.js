const express = require("express");
const { register, login, logout } = require("../controllers/authController");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.use(isAuthenticated)

router.get("/profile", (req, res) => {
    res.json({ message: "You are logged in", user: req.session.user });
});
router.post("/logout", logout);

module.exports = router;