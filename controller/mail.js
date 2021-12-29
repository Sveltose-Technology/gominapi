"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
exports.sendmail = async (req,res) =>{
  const {to,text,subject} = req.body
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "support@buynaa.com", // generated ethereal user
      pass: "Buynaa330*", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Buynaa Support" <support@buynaa.com>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: `<b>${text}</b>`, // html body
  }).then((data)=>{
    res.status(200).json({
      status: true,
      data: data,
    });
  }).catch((error)=>{
    res.status(400).json({
      status: false,
      error: error,
    });
  });

  console.log("Message sent: %s", info);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// main().catch(console.error);
