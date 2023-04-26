var nodemailer = require("nodemailer");
var sgTransport = require("nodemailer-sendgrid-transport");

var emailOptions = {
    auth: {
      api_key: process.env.EMAIL_KEY,
    },
  };

var emailClient = nodemailer.createTransport(sgTransport(emailOptions));
  
function shootMail(mailData) {
    const { name, phone, email, subject, message } = mailData;
    var mail = {
      from: "xpawal@gmail.com",
      to: "b.u.mondol@gmail.com",
      subject: subject,
      text: message,
      html: `
        <div>
          <h2> Hello Tourguru, I am ${name} </h2>
          <p>${message} </p>
          <h4>I am sending email from ${email}</h4>
          <h4>My phone number is ${phone}</h4>
        </div>
      
      `,
    };
    emailClient.sendMail(mail, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log('Message sent: ', info);
      }
    });
  }

  module.exports = shootMail;