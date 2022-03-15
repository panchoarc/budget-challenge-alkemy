const transporter = require("../config/nodemailer");
const { getTemplate } = require("../config/template");

const sendMail = async (to, data, template) => {
  const renderTemplate = getTemplate(template);

  const html = renderTemplate({ ...data });

  const mailOptions = {
    from: process.env.SERVER_EMAIL_USER,
    to: to, // Subject line
    subject: "Welcome to the app", // Subject line
    html: html, // html body
  };
  const info = await transporter.sendMail(mailOptions);
  console.log("Message sent: %s", info.messageId);
};

module.exports = {
  sendMail,
};
