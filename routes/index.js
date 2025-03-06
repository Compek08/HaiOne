const express = require("express");
const webRoutes = require("./web");
const adminRoutes = require("./admin");
const router = express.Router();

router.use("/", webRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
