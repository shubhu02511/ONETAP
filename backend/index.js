const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.send('Women Safety Backend is running');
});

// SOS endpoint
app.post('/sos', async (req, res) => {
  const { location } = req.body;
  try {
    console.log('Sending to:', process.env.ALERT_RECEIVER);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ALERT_RECEIVER.split(','),
      subject: 'SOS Alert - Women Safety Portal',
      text: `An SOS alert was triggered!${location ? `\nLocation: ${location}` : ''}`,
    });
    res.json({ success: true });
  } catch (error) {
    console.error('SOS endpoint error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Contact form endpoint
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ALERT_RECEIVER,
      subject: `Contact Form - Women Safety Portal`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 