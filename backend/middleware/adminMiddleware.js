exports.adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // user admin → allow
  } else {
    return res.status(403).json({ message: "Access denied. Admins only" });
  }
};
