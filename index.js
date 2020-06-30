const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const formidable = require('express-formidable');
require('dotenv/config');
const sendMail = require('./utils/mail');

const app = express();

app.use(cors());
app.use(formidable());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.send('app running');
});

app.post('/contact', async function (req, res) {
  const { to, from, fname, lname, email, subject, message } = req.fields;

  try {
    await sendMail({
      to,
      from,
      subject,
      text: `My name is ${fname} ${lname},
      email: ${email}
      My request: ${message}`,
    });
    return res.send('message sent successfully');
  } catch (error) {
    console.error(error.response.body.errors);
  }
});

app.listen(process.env.PORT || 3000, () =>
  console.log('Server started successfully')
);
