const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: process.env.SERVER_EMAIL_SERVICE,
  host: process.env.SERVER_EMAIL_HOST,
  port: process.env.SERVER_EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.SERVER_EMAIL_USER,
    pass: process.env.SERVER_EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
