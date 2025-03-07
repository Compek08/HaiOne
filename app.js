require("dotenv").config();
const express = require("express");
const session = require("express-session");
const router = require("./routes");
const { attachUser } = require("./middlewares/authMiddleware");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Pastikan false jika tidak pakai HTTPS
      sameSite: "strict", // Ubah ke "strict" agar lebih aman
      maxAge: 1000 * 60 * 60 * 24, // Session berlaku 24 jam
    },
  })
);
app.use(attachUser);

app.use("/", router);

app.listen(port, () => {
  console.log(`😭😭😭😭😭 BISMILLAH 100 AAMIIN 😭😭😭😭😭`);
});
