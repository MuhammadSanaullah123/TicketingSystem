const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const sendEmail = (reciever, home, data) => {
  const transporter = nodemailer.createTransport(
    sendGridTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );
  /*   var mailOptions = {
    from: process.env.ADMIN_MAIL, // sender address
    to: `${reciever}`, // list of receivers
    subject: `Reset Password`,
    html : `<h1><a href=${process.env.CLIENT_URL}/resetPassword/${data.token}>Reset Password</a></h1>`    
  }; */
  if (home) {
    const mail = transporter.sendMail({
      to: `${reciever}`,
      from: process.env.ADMIN_MAIL, // sender address
      subject: `Reset Password`,
      html: `<h1><a href=${process.env.CLIENT_URL}client/bus-listing2/${data.token}>Reset Password</a></h1>`,
    });
  } else {
    const mail = transporter.sendMail({
      to: `${reciever}`,
      from: process.env.ADMIN_MAIL, // sender address
      subject: `Reset Password`,
      html: `<h1><a href=${process.env.CLIENT_URL}client/resetPassword/${data.token}>Reset Password</a></h1>`,
    });
  }
};

module.exports = { sendEmail };
