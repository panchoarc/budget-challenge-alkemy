const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

const { validation } = require("../middlewares/validationMiddleware");
const { loginSchema, registerSchema } = require("../validations/authSchema");

router.post("/signup", validation(registerSchema), authController.signupUser);
router.post("/login", validation(loginSchema), authController.loginUser);

module.exports = router;
