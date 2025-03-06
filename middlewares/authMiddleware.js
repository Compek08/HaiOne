// Middleware: Cek apakah user sudah login
const isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
};

// Middleware: Cek role (contoh: admin)
const isAdmin = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== "admin") {
    return res.redirect("/login");
  }
  next();
};

// USER GLOBAL
const attachUser = (req, res, next) => {
  res.locals.user = req.session.user || null;
  req.user = req.session.user || null;
  next();
};

module.exports = { isAuthenticated, isAdmin, attachUser };
