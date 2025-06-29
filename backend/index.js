const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory storage for message history (in production, use a database)
let messageHistory = [];

// Message templates
const messageTemplates = {
  'safe-arrival': {
    en: 'I have safely reached my destination.',
    hi: 'मैं सुरक्षित रूप से अपने गंतव्य तक पहुंच गई हूं।'
  },
  'running-late': {
    en: 'I am running late, will update you soon.',
    hi: 'मुझे देर हो रही है, जल्द ही आपको अपडेट करूंगी।'
  },
  'need-help': {
    en: 'I need help, please call me.',
    hi: 'मुझे मदद की जरूरत है, कृपया मुझे कॉल करें।'
  },
  'check-in': {
    en: 'Just checking in to let you know I am safe.',
    hi: 'बस यह बताने के लिए चेक कर रही हूं कि मैं सुरक्षित हूं।'
  }
};

// Health check endpoint
app.get('/', (req, res) => {
  res.send('Women Safety Backend is running');
});

// Get message templates
app.get('/templates', (req, res) => {
  res.json({ templates: messageTemplates });
});

// Get message history
app.get('/messages', (req, res) => {
  res.json({ messages: messageHistory.slice(-20) }); // Return last 20 messages
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
    
    // Add to message history
    messageHistory.push({
      id: Date.now(),
      type: 'sos',
      timestamp: new Date().toISOString(),
      location: location || 'Not provided'
    });
    
    res.json({ success: true });
  } catch (error) {
    console.error('SOS endpoint error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Quick message endpoint (SMS-like)
app.post('/quick-message', async (req, res) => {
  const { message, recipients, location } = req.body;
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
      to: recipients || process.env.ALERT_RECEIVER,
      subject: 'Quick Message - Women Safety Portal',
      text: `${message}${location ? `\nLocation: ${location}` : ''}`,
    });
    
    // Add to message history
    messageHistory.push({
      id: Date.now(),
      type: 'quick-message',
      message: message,
      recipients: recipients || process.env.ALERT_RECEIVER,
      timestamp: new Date().toISOString(),
      location: location || 'Not provided'
    });
    
    res.json({ success: true });
  } catch (error) {
    console.error('Quick message error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Template message endpoint
app.post('/template-message', async (req, res) => {
  const { templateKey, language = 'en', recipients, location } = req.body;
  try {
    const template = messageTemplates[templateKey];
    if (!template) {
      return res.status(400).json({ success: false, error: 'Template not found' });
    }
    
    const message = template[language] || template.en;
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipients || process.env.ALERT_RECEIVER,
      subject: 'Template Message - Women Safety Portal',
      text: `${message}${location ? `\nLocation: ${location}` : ''}`,
    });
    
    // Add to message history
    messageHistory.push({
      id: Date.now(),
      type: 'template-message',
      templateKey: templateKey,
      message: message,
      recipients: recipients || process.env.ALERT_RECEIVER,
      timestamp: new Date().toISOString(),
      location: location || 'Not provided'
    });
    
    res.json({ success: true });
  } catch (error) {
    console.error('Template message error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Scheduled message endpoint
app.post('/schedule-message', async (req, res) => {
  const { message, recipients, scheduledTime, location } = req.body;
  try {
    const scheduledDate = new Date(scheduledTime);
    const now = new Date();
    
    if (scheduledDate <= now) {
      return res.status(400).json({ success: false, error: 'Scheduled time must be in the future' });
    }
    
    const delay = scheduledDate.getTime() - now.getTime();
    
    // Schedule the message
    setTimeout(async () => {
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
          to: recipients || process.env.ALERT_RECEIVER,
          subject: 'Scheduled Message - Women Safety Portal',
          text: `${message}${location ? `\nLocation: ${location}` : ''}`,
        });
        
        // Add to message history
        messageHistory.push({
          id: Date.now(),
          type: 'scheduled-message',
          message: message,
          recipients: recipients || process.env.ALERT_RECEIVER,
          timestamp: new Date().toISOString(),
          scheduledTime: scheduledTime,
          location: location || 'Not provided'
        });
        
        console.log('Scheduled message sent successfully');
      } catch (error) {
        console.error('Scheduled message error:', error);
      }
    }, delay);
    
    res.json({ success: true, scheduledFor: scheduledTime });
  } catch (error) {
    console.error('Schedule message error:', error);
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