const express = require("express");
const { register, login, logout } = require("../controllers/authController");
const { isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.use(isAdmin);
router.get("/products");
router.get("/products/add");
router.post("/products/add");
router.get("/products/:id");
router.get("/products/:id/edit");
router.post("/products/:id/edit");
router.get("/products/:id/delete");

module.exports = router;
