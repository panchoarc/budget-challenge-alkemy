const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signJWT = (user) => {
  const payload = {
    userId: user.id,
    email: user.email,
    name: user.name,
  };
  const token = jwt.sign(payload, process.env.SERVER_JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

module.exports = {
  signJWT,
};
