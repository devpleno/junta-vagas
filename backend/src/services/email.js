require("dotenv").config();
const nodemailer = require("nodemailer");

let transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendEmail(message) {
  try {
    let info = await transport.sendMail({ ...message });

    return info;
  } catch (err) {
    return err;
  }
}

module.exports = { sendEmail };
