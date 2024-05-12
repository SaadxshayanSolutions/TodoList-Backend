const jwt = require("jsonwebtoken");
const { response } = require("../response");

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "3d",
  });
};

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const stringToken = authHeader && authHeader.split(" ")[1];
  const token = stringToken.replace(/"/g, "");

  if (!token) {
    console.log("yes");
    return res.status(401).json(generateResponse(false, response.UnAuthorized));
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json(generateResponse(false, response.invalidToken));
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
