require("dotenv").config();
const { createPool } = require("mysql2/promise");

const pool = createPool({
  connectionLimit: 10,
  queueLimit: 0,
  host: process.env.SERVER_MYSQL_HOST,
  user: process.env.SERVER_MYSQL_USER,
  password: process.env.SERVER_MYSQL_PASSWORD,
  database: process.env.SERVER_MYSQL_DATABASE,
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Datanase has too many connection");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused");
    }
  }

  if (connection) connection.release();
  console.log("DB is connected");
  return;
});

module.exports = pool;
