require("dotenv").config();
const express = require("express");
const session = require("express-session");
const router = require("./routes");
const { attachUser } = require("./middlewares/authMiddleware");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.SESSION_SECRET || "secret-key",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, sameSite: true },
    })
);
app.use(attachUser)

app.use("/", router);

app.listen(port, () => {
    console.log(`😭😭😭😭😭 BISMILLAH 100 AAMIIN 😭😭😭😭😭`);
});
