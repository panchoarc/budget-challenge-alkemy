require("dotenv").config();
const { connection } = require("../config/database");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const authController = {};

authController.signup = async (req, res) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    let user = await connection
      .promise()
      .query("SELECT * FROM users WHERE email = ?", [email]);
    if (user[0] && user[0].length > 0) {
      res.status(409).json({
        message: "User already exists",
      });
    } else {
      return connection
        .promise()
        .query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
          name,
          email,
          hashedPassword,
        ])
        .then(() => {
          res.status(201).json({
            message: "User created successfully",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } catch (error) {
    console.log(error);
  }
};

authController.login = async (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let user = await connection
      .promise()
      .query("SELECT * FROM users WHERE email = ?", [email]);
    if (user[0] && user[0].length > 0) {
      const isMatch = await bcrypt.compare(password, user[0][0].password);
      if (isMatch) {
        const payload = {
          id: user[0][0].id,
          name: user[0][0].name,
          email: user[0][0].email,
        };
        const token = jwt.sign(payload, process.env.SERVER_JWT_SECRET, {
          expiresIn: "1h",
        });
        return res.json({
          user: payload,
          token: token,
        });
      } else {
        return res.status(400).json({
          message: "Invalid credentials",
        });
      }
    } else {
      return res.status(400).json({
        message: "User does not exist",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = authController;
