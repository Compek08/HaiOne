const express = require("express");
const { register, login, logout } = require("../controllers/authController");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const WebController = require("../controllers/webController");
const router = express.Router();

router.get("/home", WebController.home);
router.post("/register", register);
router.post("/login", login);
router.get("/login", WebController.login);
router.get("/register", WebController.register);
router.get("/category", WebController.category);

router.use(isAuthenticated);

router.get("/", isAuthenticated, WebController.home);
router.get("/category", isAuthenticated, WebController.category);
router.get("/category/:id", isAuthenticated, WebController.categoryId);
router.get("/product/:id", isAuthenticated, WebController.productId);
router.get("/cart", isAuthenticated, WebController.showCart);
router.get("/transaction", isAuthenticated, WebController.transaction);
router.get(
  "/transaction/:id",
  isAuthenticated,
  WebController.detailTransaction
);

router.get("/cart", isAuthenticated, (req, res) => {
  res.render("customer/cart");
});
router.post("/checkout", isAuthenticated, WebController.checkout);

router.get("/profile", (req, res) => {
    res.json({ message: "You are logged in", user: req.session.user });
});
router.get("/logout", logout);

module.exports = router;
