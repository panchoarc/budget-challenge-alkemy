require("dotenv").config();
const app = require("./app");
const db = require("./models");

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

async function start() {
  try {
    await db.sequelize.authenticate();

    app.listen(PORT, () => {
      console.log(`Server running on host ${HOST} port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}
start();
