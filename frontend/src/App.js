import React, { useState } from 'react';
import './App.css';

const translations = {
  en: {
    title: 'Women Safety Portal',
    subtitle: 'Your safety, our priority.',
    sos: 'Emergency SOS',
    sendSOS: 'Send SOS',
    sosSent: 'SOS Sent!',
    sosInfo: 'Press the button in case of emergency. Your alert will be sent instantly.',
    resources: 'Resources & Helplines',
    mapTitle: 'Nearby Police Stations & Hospitals',
    mapDesc: 'Find the nearest police stations and hospitals in your area. (You can zoom and move the map.)',
    contact: 'Contact for Help',
    name: 'Your Name',
    email: 'Your Email',
    message: 'Your Message',
    sendMessage: 'Send Message',
    messageSent: 'Message Sent!',
    faq: 'FAQ & Safety Tips',
    quickExit: 'Quick Exit',
    warning: 'Note: The official SHe-Box site may show a security warning due to an expired certificate. Proceed only if you trust the site.'
  },
  hi: {
    title: 'महिला सुरक्षा पोर्टल',
    subtitle: 'आपकी सुरक्षा, हमारी प्राथमिकता।',
    sos: 'आपातकालीन एसओएस',
    sendSOS: 'एसओएस भेजें',
    sosSent: 'एसओएस भेजा गया!',
    sosInfo: 'आपातकाल में बटन दबाएं। आपका अलर्ट तुरंत भेजा जाएगा।',
    resources: 'संसाधन और हेल्पलाइन',
    mapTitle: 'नजदीकी पुलिस स्टेशन और अस्पताल',
    mapDesc: 'अपने क्षेत्र में निकटतम पुलिस स्टेशन और अस्पताल खोजें। (आप मानचित्र को ज़ूम और मूव कर सकते हैं।)',
    contact: 'सहायता के लिए संपर्क करें',
    name: 'आपका नाम',
    email: 'आपका ईमेल',
    message: 'आपका संदेश',
    sendMessage: 'संदेश भेजें',
    messageSent: 'संदेश भेजा गया!',
    faq: 'सामान्य प्रश्न और सुरक्षा सुझाव',
    quickExit: 'त्वरित निकास',
    warning: 'नोट: आधिकारिक SHe-Box साइट में प्रमाणपत्र की समाप्ति के कारण सुरक्षा चेतावनी दिखाई दे सकती है। केवल तभी आगे बढ़ें जब आप साइट पर भरोसा करते हों।'
  }
};

const quotes = [
  'You are stronger than you think.',
  'Your safety is your right. Never hesitate to ask for help.',
  'Stay alert, stay safe, stay empowered.',
  'Courage is not the absence of fear, but the triumph over it.',
  'Share your location with a trusted contact when going out.',
  'Keep emergency numbers saved in your phone.',
  'If you feel unsafe, move to a public place and call for help.',
  'Do not share personal information with strangers online.',
  'Use the SOS button in emergencies to alert your contacts.'
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

const logoSvg = (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="24" fill="#e75480"/>
    <path d="M24 12C19 12 15 16 15 21C15 29 24 36 24 36C24 36 33 29 33 21C33 16 29 12 24 12Z" fill="#fff"/>
    <circle cx="24" cy="21" r="4" fill="#e75480"/>
  </svg>
);

function App() {
  const [lang, setLang] = useState('en');
  const t = translations[lang];
  const [sosSent, setSosSent] = useState(false);
  const [sosError, setSosError] = useState('');
  const [contact, setContact] = useState({ name: '', email: '', message: '' });
  const [contactSent, setContactSent] = useState(false);
  const [contactError, setContactError] = useState('');
  const [copied, setCopied] = useState('');
  const [quote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);

  const handleCopy = (number) => {
    navigator.clipboard.writeText(number);
    setCopied(number);
    setTimeout(() => setCopied(''), 1500);
  };

  const handleSos = async () => {
    setSosSent(false);
    setSosError('');
    try {
      // Optionally, get location
      let location = '';
      if (navigator.geolocation) {
        await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              location = `Lat: ${pos.coords.latitude}, Lng: ${pos.coords.longitude}`;
              resolve();
            },
            () => resolve(), // Ignore error, just resolve
            { timeout: 5000 }
          );
        });
      }
      const res = await fetch('http://localhost:5000/sos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location }),
      });
      const data = await res.json();
      if (data.success) {
        setSosSent(true);
        setTimeout(() => setSosSent(false), 3000);
      } else {
        setSosError('Failed to send SOS.');
      }
    } catch (err) {
      setSosError('Failed to send SOS.');
    }
  };

  const handleContactChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactSent(false);
    setContactError('');
    try {
      const res = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact),
      });
      const data = await res.json();
      if (data.success) {
        setContactSent(true);
        setContact({ name: '', email: '', message: '' });
        setTimeout(() => setContactSent(false), 3000);
      } else {
        setContactError('Failed to send message.');
      }
    } catch (err) {
      setContactError('Failed to send message.');
    }
  };

  // Quick Exit handler
  const handleQuickExit = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <div className="App">
      <div className="top-bar">
        <div className="lang-switcher">
          <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
          <button className={lang === 'hi' ? 'active' : ''} onClick={() => setLang('hi')}>हिंदी</button>
        </div>
        <button className="quick-exit" onClick={handleQuickExit}>{t.quickExit}</button>
      </div>
      <header className="App-header">
        <div className="logo-mascot">{logoSvg}</div>
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
        <div className="greeting-quote">
          <span className="greeting">{getGreeting()}, stay safe!</span>
          <span className="quote">{quote}</span>
        </div>
      </header>
      {/* SVG Divider */}
      <svg className="divider" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,53.3C960,64,1056,96,1152,101.3C1248,107,1344,85,1392,74.7L1440,64V0H1392C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0H0Z"></path></svg>
      <main>
        <section className="sos-section">
          <h2>{t.sos}</h2>
          <button className="sos-btn" onClick={handleSos} disabled={sosSent}>
            {sosSent ? t.sosSent : t.sendSOS}
          </button>
          {sosError && <p className="error-msg">{sosError}</p>}
          <p className="sos-info">{t.sosInfo}</p>
        </section>
        <section className="info-section">
          <h2>{t.resources}</h2>
          <h3>🚨 Emergency</h3>
          <ul>
            <li>🚓 <strong>Police:</strong> 100 <button className="copy-btn" onClick={() => handleCopy('100')}>{copied === '100' ? 'Copied!' : 'Copy'}</button></li>
            <li>🚑 <strong>Ambulance:</strong> 102 <button className="copy-btn" onClick={() => handleCopy('102')}>{copied === '102' ? 'Copied!' : 'Copy'}</button></li>
            <li>📞 <strong>National Helpline:</strong> 112 <button className="copy-btn" onClick={() => handleCopy('112')}>{copied === '112' ? 'Copied!' : 'Copy'}</button></li>
            <li>👩 <strong>Women Helpline:</strong> 1091 <button className="copy-btn" onClick={() => handleCopy('1091')}>{copied === '1091' ? 'Copied!' : 'Copy'}</button></li>
            <li>👧 <strong>Child Helpline:</strong> 1098 <button className="copy-btn" onClick={() => handleCopy('1098')}>{copied === '1098' ? 'Copied!' : 'Copy'}</button></li>
            <li>👵 <strong>Senior Citizen Helpline:</strong> 14567 <button className="copy-btn" onClick={() => handleCopy('14567')}>{copied === '14567' ? 'Copied!' : 'Copy'}</button></li>
            <li>🏠 <strong>Domestic Violence:</strong> 181 <button className="copy-btn" onClick={() => handleCopy('181')}>{copied === '181' ? 'Copied!' : 'Copy'}</button></li>
          </ul>
          <h3>🛡️ Legal & Cyber Safety</h3>
          <ul>
            <li>⚖️ <strong>Legal Aid:</strong> 15100 <button className="copy-btn" onClick={() => handleCopy('15100')}>{copied === '15100' ? 'Copied!' : 'Copy'}</button></li>
            <li>💻 <strong>Cyber Crime Helpline:</strong> 155260 <button className="copy-btn" onClick={() => handleCopy('155260')}>{copied === '155260' ? 'Copied!' : 'Copy'}</button></li>
            <li>🧑‍⚖️ <a href="https://nhrc.nic.in/" target="_blank" rel="noopener noreferrer">National Human Rights Commission</a></li>
            <li>🛑 <a href="https://shebox.wcd.gov.in/" target="_blank" rel="noopener noreferrer">Report Online Harassment (SHe-Box)</a></li>
          </ul>
          <h3>🧠 Mental Health</h3>
          <ul>
            <li>🧑‍⚕️ <strong>Mental Health Helpline:</strong> 9152987821 <button className="copy-btn" onClick={() => handleCopy('9152987821')}>{copied === '9152987821' ? 'Copied!' : 'Copy'}</button></li>
          </ul>
        </section>
        <section className="map-section">
          <h2>{t.mapTitle}</h2>
          <p>{t.mapDesc}</p>
          <div className="map-container">
            <iframe
              title="Nearby Police Stations and Hospitals"
              width="100%"
              height="350"
              style={{ border: 0, borderRadius: '10px' }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed/v1/search?key=AIzaSyC2MV28oPqkJpumJqcS3GYuHlKjuaokKO8&q=police+station+and+hospital+near+me">
            </iframe>
          </div>
        </section>
        <section className="contact-section">
          <h2>{t.contact}</h2>
          <form onSubmit={handleContactSubmit}>
            <input type="text" name="name" placeholder={t.name} value={contact.name} onChange={handleContactChange} required />
            <input type="email" name="email" placeholder={t.email} value={contact.email} onChange={handleContactChange} required />
            <textarea name="message" placeholder={t.message} value={contact.message} onChange={handleContactChange} required />
            <button type="submit" disabled={contactSent}>{contactSent ? t.messageSent : t.sendMessage}</button>
            {contactError && <p className="error-msg">{contactError}</p>}
          </form>
        </section>
        <section className="faq-section">
          <h2>{t.faq}</h2>
          <ul>
            <li>{lang === 'en' ? 'Always share your location with a trusted contact when going out.' : 'बाहर जाते समय हमेशा अपनी लोकेशन किसी विश्वसनीय व्यक्ति के साथ साझा करें।'}</li>
            <li>{lang === 'en' ? 'Keep emergency numbers saved in your phone.' : 'आपातकालीन नंबर अपने फोन में सेव रखें।'}</li>
            <li>{lang === 'en' ? 'If you feel unsafe, move to a public place and call for help.' : 'अगर आप असुरक्षित महसूस करें तो सार्वजनिक स्थान पर जाएं और मदद के लिए कॉल करें।'}</li>
            <li>{lang === 'en' ? 'Do not share personal information with strangers online.' : 'ऑनलाइन अजनबियों के साथ व्यक्तिगत जानकारी साझा न करें।'}</li>
            <li>{lang === 'en' ? 'Use the SOS button in emergencies to alert your contacts.' : 'आपातकाल में अपने संपर्कों को अलर्ट करने के लिए एसओएस बटन का उपयोग करें।'}</li>
          </ul>
        </section>
      </main>
      <footer>
        <p>Made with <span style={{color:'#e75480',fontWeight:'bold'}}>❤️</span> in India &mdash; Empowering Women, One Tap at a Time</p>
      </footer>
      {/* Floating Action SOS Button for mobile */}
      <button className="fab-sos-btn" onClick={handleSos} title="Send SOS">
        <span role="img" aria-label="SOS">🆘</span>
      </button>
    </div>
  );
}

export default App;
