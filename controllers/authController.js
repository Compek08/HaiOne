const bcrypt = require("bcryptjs");
const { User } = require("../models"); // Import model user

// REGISTER
const register = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Hash password sebelum disimpan ke database
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = { username, email, password: hashedPassword };
        let user = await User.create(newUser); // Simpan ke array sebagai simulasi DB
        res.session.user = user
        res.redirect("/");
    } catch (error) {
        res.redirect("/register");
    }
};

// LOGIN
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Cari user berdasarkan username
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(400).json({ error: "User not found" });

        // Bandingkan password
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        // Simpan session
        req.session.user = user;
        res.redirect(`/${ user.role === "admin" ? "admin" : "" }`);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// LOGOUT
const logout = (req, res) => {
    req.session.destroy();
    // req.flash("success", "See You Later");
    res.redirect("/");
};

module.exports = { register, login, logout };
