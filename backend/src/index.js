const app = require("./app");
const db = require("./models");

const PORT = process.env.SERVER_PORT;

async function start() {
  try {
    await db.sequelize.sync({ force: false });
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}
start();
