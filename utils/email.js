const crypto = require("crypto");
const nodemailer = require("nodemailer");

const generateOtp = () => {
  return crypto.randomBytes(3).toString("hex");
};

const sendEmail = async (options) => {
  //1. Create a Transporter

  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "7d24db90007972",
      pass: "ac5d6ad376ac29",
    },
    // host: process.env.HOST,
    // port: process.env.MAILTRAP_PORT,
    // auth: {
    //   user: process.env.USERNAME,
    //   password: process.env.PASSWORD,
    // },
  });
  //2. email options
  const mailOptions = {
    from: "Muhammad Waseem <waseem@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  //3. send email
  await transporter.sendMail(mailOptions);
};

module.exports = { generateOtp, sendEmail };
