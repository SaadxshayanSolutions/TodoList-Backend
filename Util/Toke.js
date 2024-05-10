const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "3d",
  });
};

const authToken = (req, res, next) => {
  const token = req.body.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid Token" });
    }

    req.user = user;
    req.token = token;
    next();
  });
};

const generateResponse = (status, message, data = {}) => {
  return {
    success: status,
    message: message,
    data: data,
  };
};

module.exports = { generateToken, authToken, generateResponse };
