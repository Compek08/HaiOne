const express = require("express");
const authRoutes = require("./authRoutes");
const customerRoutes = require("./customer");

const router = express.Router();

// Define the root route
router.get("/", (req, res) => {
  res.send("Welcome to the homepage!");
});

// Use other routes
router.use("/auth", authRoutes);
router.use("/customer", customerRoutes);

module.exports = router;
