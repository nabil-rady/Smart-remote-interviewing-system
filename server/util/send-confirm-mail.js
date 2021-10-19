const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const createToken = require('./create-token');
const verifySignupToken = require('./verify-email-token');

module.exports = (userId, receiverEmail) => {
  // create a token with user's id.
  const verificationToken = createToken(
    userId,
    process.env.mailTOKEN_SECRET,
    '15m'
  );

  // create a transporter with the mailing service.
  const transporter = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key: process.env.sendgridTransportApiKey,
      },
    })
  );
  const baseUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8080/'
      : 'https://vividly-api.herokuapp.com/';
  const route = `user/verify/${verificationToken}`;
  // sending email with verification link.
  return transporter.sendMail({
    to: receiverEmail,
    from: 'mohamed.medhat2199@gmail.com',
    subject: 'Email confirmation.',
    html: `<h1>Please, confirm your email</h1>
             <a href=${baseUrl + route}> Click here to confirm your email </a>`,
  });
};
