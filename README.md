# 🛡️ Women Safety Portal (ONETAP)

A comprehensive web application designed to enhance women's safety through emergency alerts, resource access, and support systems. Built with React frontend and Node.js backend.

## 🌟 Features

### 🚨 Emergency SOS System
- **One-tap SOS button** for immediate emergency alerts
- **Automatic location sharing** when SOS is triggered
- **Instant email notifications** to trusted contacts
- **Quick exit button** for discreet navigation

### 📱 Multi-language Support
- **English and Hindi** interface
- **Accessible design** for all users
- **Responsive layout** for mobile and desktop

### 🆘 Emergency Resources
- **Emergency helpline numbers** with one-click copy
- **Police stations and hospitals** location finder
- **Legal and cyber safety** resources
- **Domestic violence support** information

### 📞 Contact & Support
- **Contact form** for seeking help
- **Email integration** for support requests
- **Real-time messaging** system

### 🗺️ Location Services
- **Interactive map** showing nearby emergency services
- **GPS integration** for accurate location tracking
- **Safety tips** and guidelines

### 📱 Messaging Features
- **Quick Messages**: Send instant SMS-like messages to contacts
- **Message Templates**: Pre-written messages for common situations:
  - Safe Arrival
  - Running Late
  - Need Help
  - Check In
- **Custom Messages**: Write and send personalized messages
- **Scheduled Messages**: Schedule messages to be sent at a specific time
- **Message History**: Track all sent messages with timestamps and locations

## 🛠️ Technology Stack

### Frontend
- **React 19.1.0** - Modern UI framework
- **CSS3** - Styling and animations
- **Progressive Web App (PWA)** - Offline capabilities
- **Geolocation API** - Location services

### Backend
- **Node.js** - Server runtime
- **Express.js 5.1.0** - Web framework
- **Nodemailer 7.0.3** - Email functionality
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📋 Prerequisites

Before running this application, make sure you have:
- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager
- **Gmail account** for email notifications
- **Modern web browser** with geolocation support

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/shubhu02511/ONETAP.git
cd ONETAP
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ALERT_RECEIVER=trusted-contact@email.com,another-contact@email.com
```

**Note:** For Gmail, you'll need to use an App Password instead of your regular password.

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. Start the Application

#### Start Backend Server
```bash
cd backend
npm start
```
The backend will run on `http://localhost:5000`

#### Start Frontend Development Server
```bash
cd frontend
npm start
```
The frontend will run on `http://localhost:3000`

## 🔧 Configuration

### Email Setup
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. Use this app password in your `.env` file

### Emergency Contacts
Add trusted contacts' email addresses to the `ALERT_RECEIVER` environment variable, separated by commas.

## 📱 Usage

### Emergency SOS
1. Click the **"Send SOS"** button in case of emergency
2. Allow location access when prompted
3. Emergency alert will be sent to all configured contacts
4. Use **"Quick Exit"** button for discreet navigation

### Contact Form
1. Fill in your name, email, and message
2. Click **"Send Message"** to contact support
3. Your message will be forwarded to the support team

### Emergency Resources
- Copy emergency numbers with one click
- Access nearby police stations and hospitals
- Find legal and cyber safety resources

### Messaging Features
- **Quick Messages**: Send instant SMS-like messages to contacts
- **Message Templates**: Pre-written messages for common situations:
  - Safe Arrival
  - Running Late
  - Need Help
  - Check In
- **Custom Messages**: Write and send personalized messages
- **Scheduled Messages**: Schedule messages to be sent at a specific time
- **Message History**: Track all sent messages with timestamps and locations

## 🔒 Security Features

- **Quick Exit** - Instantly redirects to Google for privacy
- **Location sharing** - Only activated when SOS is triggered
- **Secure email** - Uses Gmail's secure authentication
- **CORS protection** - Prevents unauthorized access

## 🌐 Deployment

### Backend Deployment (Heroku)
```bash
cd backend
heroku create your-app-name
git add .
git commit -m "Deploy backend"
git push heroku main
```

### Frontend Deployment (Netlify/Vercel)
```bash
cd frontend
npm run build
# Upload the build folder to your hosting service
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- **Email:** [Your support email]
- **Issues:** [GitHub Issues](https://github.com/shubhu02511/ONETAP/issues)

## 🆘 Emergency Numbers (India)

- **Police:** 100
- **Ambulance:** 102
- **National Emergency:** 112
- **Women Helpline:** 1091
- **Child Helpline:** 1098
- **Senior Citizen Helpline:** 14567
- **Domestic Violence:** 181

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Express.js** for the robust backend
- **Nodemailer** for email functionality
- **All contributors** who help make women's safety a priority

---

**⚠️ Important:** This application is designed for emergency situations. Always prioritize your safety and contact local emergency services when in immediate danger.

**Made with ❤️ for women's safety and empowerment**

## API Endpoints

### Emergency
- `POST /sos` - Send emergency SOS alert

### Messaging
- `POST /quick-message` - Send instant message
- `POST /template-message` - Send pre-written template message
- `POST /schedule-message` - Schedule a message for later
- `GET /templates` - Get available message templates
- `GET /messages` - Get message history

### Contact
- `POST /contact` - Send contact form message

## Message Templates

The application includes pre-written message templates in both English and Hindi:

- **Safe Arrival**: "I have safely reached my destination."
- **Running Late**: "I am running late, will update you soon."
- **Need Help**: "I need help, please call me."
- **Check In**: "Just checking in to let you know I am safe."

## Safety Features

- **Quick Exit**: Instantly redirects to Google for emergency situations
- **Location Sharing**: Automatic GPS location with all messages
- **Trusted Contacts**: Configure multiple email recipients for alerts
- **Message History**: Keep track of all communications for safety

## Technologies Used

- **Frontend**: React.js, CSS3
- **Backend**: Node.js, Express.js
- **Email**: Nodemailer
- **Location**: HTML5 Geolocation API

## Contributing

This project is designed to enhance women's safety. Contributions are welcome to improve features, add new safety resources, or enhance the user experience.

## License

This project is open source and available under the MIT License.
