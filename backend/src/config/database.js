require("dotenv").config();
const mysql = require("mysql2");


const connection = mysql.createConnection({
  host: process.env.SERVER_MYSQL_HOST,
  user: process.env.SERVER_MYSQL_USER,
  password: process.env.SERVER_MYSQL_PASSWORD,
  database: process.env.SERVER_MYSQL_DATABASE,
});

async function connectToDB() {
  try {
    connection.connect();
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log("Error al conectar a la base de datos");
  }
}

module.exports = {
  connectToDB,
  connection,
};
