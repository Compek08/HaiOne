require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes"); // Menggunakan index.js sebagai entry point route

const app = express();
const port = process.env.PORT || 3000;

// Setup view engine (EJS)
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Untuk parsing request body dalam JSON
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Untuk testing di HTTP, ubah ke true jika menggunakan HTTPS
  })
);

// Routes

// app.use("/", router);
app.use("/auth", authRoutes);

// Start Server
app.listen(port, () => {
  console.log(`😭😭😭😭😭 Server running on port ${port} 😭😭😭😭😭`);
});
