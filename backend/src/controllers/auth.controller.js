require("dotenv").config();
const pool = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authController = {};

authController.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const sql = "SELECT * FROM users WHERE email = ?";
    const hashedPassword = await bcrypt.hash(password, 10);

    let user = await pool.query(sql, [email]);
    if (user[0] && user[0].length > 0) {
      res.status(400).json({
        message: "User already exists",
      });
    } else {
      return pool
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

  try {
    const loginSQL = "SELECT * FROM users WHERE email = ?";
    let user = await pool.query(loginSQL, [email]);
    if (user[0].length > 0) {
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
