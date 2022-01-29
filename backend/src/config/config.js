require("dotenv").config();

SERVER_JWT_SECRET = "secret";
module.exports = {
  development: {
    username: "root",
    password: "root",
    database: "budget-dev",
    host: "localhost",
    dialect: "mysql",
    db_port: "3306",
    server_port: "5000",
    logging: false,
  },
  test: {
    username: "root",
    password: "root",
    database: "budget-test",
    host: "localhost",
    dialect: "mysql",
    db_port: "3306",
    server_port: "5000",
    logging: false,
  },
  production: {
    username: process.env.SERVER_MYSQL_USER,
    password: process.env.SERVER_MYSQL_PASSWORD,
    database: process.env.SERVER_MYSQL_DATABASE,
    host: process.env.SERVER_MYSQL_HOST,
    dialect: process.env.SERVER_MYSQL_DIALECT,
    db_port: process.env.SERVER_MYSQL_PORT,
    server_port: process.env.PORT,
    logging: false,
  },
};
