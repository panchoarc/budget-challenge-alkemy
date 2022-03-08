require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  //Read the token from the headers

  try {
    const token = req.headers.authorization.split(" ")[1];

    //Check if no token
    if (!token) {
      return res.status(401).json({ message: "Token not Provided" });
    }

    //Check token
    const cypher = jwt.verify(token, process.env.SERVER_JWT_SECRET);
    req.users = cypher;
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
