const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

const { validation } = require("../middlewares/validationMiddleware");
const { loginSchema, registerSchema } = require("../validations/authSchema");

router.post("/signup", validation(registerSchema), authController.signup);
router.post("/login", validation(loginSchema), authController.login);

module.exports = router;
