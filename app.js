require("dotenv").config();
const express = require("express");
const session = require("express-session");
const router = require("./routes");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.SESSION_SECRET || "secret-key",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

app.use("/", router);

app.listen(port, () => {
    console.log(`😭😭😭😭😭 BISMILLAH 100 AAMIIN 😭😭😭😭😭`);
});
