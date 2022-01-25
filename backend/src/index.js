//Creates a basic express app
require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const authRoutes = require("./routes/auth.routes");
const operationRoutes = require("./routes/operation.routes");

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/operations", operationRoutes);

//Start server
const PORT = process.env.PORT || 5000;

async function start() {
  try {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
