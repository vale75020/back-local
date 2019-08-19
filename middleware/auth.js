const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header("Bearer");
  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied !" });
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid !" });
  }
};
