const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");

const emailOptions = {
    auth: {
      api_key: process.env.EMAIL_KEY,
    },
  };

const emailClient = nodemailer.createTransport(sgTransport(emailOptions));

function shootMail(mailData) {
    const { name, phone, email, subject, message } = mailData;
    const mail = {
      from: "xpawal@gmail.com",
      to: "b.u.mondol@gmail.com",
      subject,
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
    emailClient.sendMail(mail,  (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Message sent: ', info);
      }
    });
  }

  module.exports = shootMail;