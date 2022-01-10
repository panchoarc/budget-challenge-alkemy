const yup = require("yup");

const operationCreateSchema = yup.object().shape({
  concept: yup.string().required("Concept is required"),
  amount: yup
    .number("Only allows numbers")
    .typeError("Amount must be a number")
    .positive("Only allows positive numbers")
    .required("Amount is required")
    .nullable(false)
    .min(1),
  date: yup
    .date()
    .required("Date is required")
    .typeError("date must be a valid Date"),
  type: yup
    .string()
    .oneOf(["INCOME", "EXPENSE"])
    .required("You have to choose a option"),
});

const editOperationSchema = yup.object().shape({
  concept: yup.string().required("Concept is required"),
  amount: yup
    .number("Only allows numbers")
    .typeError("Amount must be a number")
    .positive("Only allows positive numbers")
    .required("Amount is required")
    .nullable(false)
    .min(1),
  date: yup
    .date()
    .required("Date is required")
    .typeError("date must be a valid Date"),
});

module.exports = { operationCreateSchema, editOperationSchema };
