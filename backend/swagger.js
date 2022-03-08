const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/app.js"];

const doc = {
  info: {
    title: "Budget API", // short title.
    description: "A simple Budget API", //  desc.
    version: "1.0.0", // version number
    contact: {
      name: "Francisco Ríos", // your name
      email: "francisco.rios.cabello@gmail.com", // your email
    },
    description: "Budget API created for Alkemy Challenge by Francisco Ríos", // long description
  },
  host: "localhost:5000",
  schemes: ["http"],
  basePath: "/api",
  consumes: ["application/json"],
  produces: ["application/json"],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./src/index"); // Your project's root file
});
