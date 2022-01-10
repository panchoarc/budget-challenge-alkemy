const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/verifyJWT");
const operationsController = require("../controllers/operations.controller");
const { validation } = require("../middlewares/validationMiddleware");

const {
  operationCreateSchema,
  editOperationSchema,
} = require("../validations/operationsSchema");

router.get("/", authMiddleware, operationsController.getLast10Operations);

router.post(
  "/",
  authMiddleware,
  validation(operationCreateSchema),
  operationsController.createOperation
);

router.put(
  "/:id",
  authMiddleware,
  validation(editOperationSchema),
  operationsController.updateOperation
);

router.delete("/:id", authMiddleware, operationsController.deleteOperation);

router.get("/:id", authMiddleware, operationsController.getOperation);

module.exports = router;
