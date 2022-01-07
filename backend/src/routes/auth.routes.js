const express = require("express");
const router = express.Router();
const { connection } = require("../config/database");
const { body } = require("express-validator");

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/verifyJWT");

router.post(
  "/signup",
  body("name").not().isEmpty().withMessage("Name is required"),
  body("email").isEmail().normalizeEmail().withMessage("Email is required"),
  body("password")
    .isLength({ min: 6 }, { max: 50 })
    .withMessage(
      "Password must be at least 6 characters and maximum 50 characters"
    ),
  authController.signup
);
router.post(
  "/login",
  body("email").isEmail().normalizeEmail().withMessage("Email is required"),
  body("password")
    .isLength({ min: 6 }, { max: 50 })
    .withMessage(
      "Password must be at least 6 characters and maximum 50 characters"
    ),
  authController.login
);

module.exports = router;
