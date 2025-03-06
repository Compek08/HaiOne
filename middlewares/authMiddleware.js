// Middleware: Cek apakah user sudah login
const isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Unauthorized, please login" });
  }
  next();
};

// Middleware: Cek role (contoh: admin)
const isAdmin = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden, admin only" });
  }
  next();
};

module.exports = { isAuthenticated, isAdmin };
