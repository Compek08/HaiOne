const express = require("express");
const { register, login, logout } = require("../controllers/authController");
const { isAdmin } = require("../middlewares/authMiddleware");
const AdminController = require("../controllers/adminController");
const router = express.Router();

router.use(isAdmin)
router.get("/", AdminController.index)
router.get("/profile", AdminController.profile)
router.post("/profile/update", AdminController.updateProfile)
router.get("/categories/:id", AdminController.showCategory)
router.get("/products", AdminController.products)
router.get("/products/add", AdminController.addProduct)
router.post("/products/add", AdminController.createProduct)
router.get("/products/:id", AdminController.showProduct)
router.get("/products/:id/edit", AdminController.editProduct)
router.post("/products/:id/edit", AdminController.updateProduct)
router.get("/products/:id/delete", AdminController.deleteProduct)

module.exports = router;
