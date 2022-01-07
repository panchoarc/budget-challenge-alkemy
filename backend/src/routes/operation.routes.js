const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/verifyJWT");
const operationsController = require("../controllers/operations.controller");

router.get("/", authMiddleware, operationsController.getLast10Operations);

router.post("/", authMiddleware, operationsController.createOperation);

router.put("/:id", authMiddleware, operationsController.updateOperation);

router.delete("/:id", authMiddleware, operationsController.deleteOperation);

router.get("/:id", authMiddleware, operationsController.getOperation);

module.exports = router;
