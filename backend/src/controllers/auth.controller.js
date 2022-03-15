const {
  generateEncryptedPassword,
  comparePassword,
} = require("../helpers/PasswordEncrypter");
const { signJWT } = require("../helpers/Jwt");
const db = require("../models");
const UserEntity = "users";

const { sendMail } = require("../services/emailService");

const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await db[UserEntity].findOne({ where: { email } });
    if (userExists) {
      res.status(400).json({
        message: "User already exists",
      });
    } else {
      const registerData = {
        name,
        email,
      };
      const hashedPassword = await generateEncryptedPassword(password);
      await db[UserEntity].create({ name, email, password: hashedPassword });
      await sendMail(email, registerData, "register"); // send email to user
      res.status(201).json({ message: "User created successfully" });
    }
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db[UserEntity].findOne({ where: { email } });
    if (user) {
      const isMatch = await comparePassword(password, user.password);
      if (isMatch) {
        const token = signJWT(user);
        res.status(200).json({ token });
      } else {
        res.status(400).json({ message: "Invalid Credentials" });
      }
    } else {
      return res.status(404).json({ message: "User does not exist" });
    }
  } catch (error) {
    console.log(error);
  }
};

const authController = {
  signupUser,
  loginUser,
};

module.exports = authController;
