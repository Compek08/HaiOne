const bcrypt = require("bcryptjs");
const { User } = require("../models"); // Import model user

// REGISTER
const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Hash password sebelum disimpan ke database
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Simpan user ke database (simulasi)
        const newUser = { username, password: hashedPassword };
        User.push(newUser); // Simpan ke array sebagai simulasi DB

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
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
    res.json({ message: "Logged out successfully" });
};

module.exports = { register, login, logout };
