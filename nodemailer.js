const express = require('express');
const app = express();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: true,
  auth: {
    user: "vincent.lowe5@ethereal.email",
    pass: "7u2Nt1U1XAzCT2JAHp",
  },
});

async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"parmeshb90@gmail.com', // sender address
    to: "vincent.lowe5@ethereal.email", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}
console.log('error')
main().catch(console.error);