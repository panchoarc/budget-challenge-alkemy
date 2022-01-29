const express = require("express");
const apiRouter = express.Router();
const router = express.Router();

const authRoutes = require("./auth.routes");
const operationRoutes = require("./operation.routes");

router.use("/auth", authRoutes);
router.use("/operations", operationRoutes);

apiRouter.use("/api", router);

module.exports = apiRouter;
