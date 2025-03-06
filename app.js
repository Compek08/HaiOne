// app.js
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const router = require("./routes");

const app = express();
const port = process.env.PORT || 3000;

// Setup view engine (EJS)
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Define the root route
app.get("/", (req, res) => {
  res.send("Welcome to the homepage!");
});

// Use the router for other routes
app.use("/", router);

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
