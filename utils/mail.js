const sgMail = require('@sendgrid/mail');
require('dotenv/config');

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(SENDGRID_API_KEY);

module.exports = function sendMail({
  to = '',
  from = '',
  subject = '',
  text = '',
}) {
  return sgMail.send({
    to,
    from,
    subject,
    text,
  });
};
