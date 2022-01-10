const yup = require("yup");

const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required("name is required")
    .matches(/^[\w\s]*$/g, "Only alphabets are allowed for this field "),
  email: yup
    .string()
    .required("email is required")
    .email("Invalid email format"),
  password: yup.string().required("password is required").min(6).max(50),
});

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("email is required")
    .email("Invalid email format"),
  password: yup.string().required("password is required").min(6).max(50),
});

module.exports = {
  registerSchema,
  loginSchema,
};
