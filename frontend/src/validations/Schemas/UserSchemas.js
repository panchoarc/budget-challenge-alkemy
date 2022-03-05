import * as yup from "yup";

const registerSchema = yup.object({
  name: yup
    .string()
    .required("name is required")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  email: yup
    .string()
    .required("email is required")
    .email("Invalid email format"),
  password: yup.string().required("password is required").min(6).max(50),
});

const loginSchema = yup.object({
  email: yup
    .string()
    .required("email is required")
    .email("Invalid email format"),
  password: yup.string().required("password is required").min(6).max(50),
});

export { registerSchema, loginSchema };
