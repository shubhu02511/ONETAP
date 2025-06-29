import React, { useState, useEffect } from 'react';
import './App.css';
import ScrollVelocity from './ScrollVelocity';
import ClickSpark from './ClickSpark';

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
    warning: 'Note: The official SHe-Box site may show a security warning due to an expired certificate. Proceed only if you trust the site.',
    messaging: 'Quick Messaging',
    quickMessage: 'Quick Message',
    quickMessagePlaceholder: 'Type your message here...',
    sendQuickMessage: 'Send Quick Message',
    quickMessageSent: 'Quick Message Sent!',
    templates: 'Message Templates',
    safeArrival: 'Safe Arrival',
    runningLate: 'Running Late',
    needHelp: 'Need Help',
    checkIn: 'Check In',
    sendTemplate: 'Send Template',
    templateSent: 'Template Sent!',
    scheduledMessage: 'Scheduled Message',
    scheduleFor: 'Schedule for',
    scheduleMessage: 'Schedule Message',
    messageScheduled: 'Message Scheduled!',
    messageHistory: 'Message History',
    noMessages: 'No messages yet',
    recipients: 'Recipients (optional)',
    recipientsPlaceholder: 'Enter email addresses separated by commas',
    location: 'Include Location',
    customMessage: 'Custom Message',
    customMessagePlaceholder: 'Type your custom message...',
    sendCustomMessage: 'Send Custom Message',
    customMessageSent: 'Custom Message Sent!'
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
    warning: 'नोट: आधिकारिक SHe-Box साइट में प्रमाणपत्र की समाप्ति के कारण सुरक्षा चेतावनी दिखाई दे सकती है। केवल तभी आगे बढ़ें जब आप साइट पर भरोसा करते हों।',
    messaging: 'त्वरित संदेश',
    quickMessage: 'त्वरित संदेश',
    quickMessagePlaceholder: 'यहां अपना संदेश टाइप करें...',
    sendQuickMessage: 'त्वरित संदेश भेजें',
    quickMessageSent: 'त्वरित संदेश भेजा गया!',
    templates: 'संदेश टेम्पलेट',
    safeArrival: 'सुरक्षित पहुंच',
    runningLate: 'देर हो रही है',
    needHelp: 'मदद चाहिए',
    checkIn: 'चेक इन',
    sendTemplate: 'टेम्पलेट भेजें',
    templateSent: 'टेम्पलेट भेजा गया!',
    scheduledMessage: 'शेड्यूल्ड संदेश',
    scheduleFor: 'शेड्यूल के लिए',
    scheduleMessage: 'संदेश शेड्यूल करें',
    messageScheduled: 'संदेश शेड्यूल किया गया!',
    messageHistory: 'संदेश इतिहास',
    noMessages: 'अभी तक कोई संदेश नहीं',
    recipients: 'प्राप्तकर्ता (वैकल्पिक)',
    recipientsPlaceholder: 'कॉमा से अलग किए गए ईमेल पते दर्ज करें',
    location: 'लोकेशन शामिल करें',
    customMessage: 'कस्टम संदेश',
    customMessagePlaceholder: 'अपना कस्टम संदेश टाइप करें...',
    sendCustomMessage: 'कस्टम संदेश भेजें',
    customMessageSent: 'कस्टम संदेश भेजा गया!'
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
  
  // New messaging states
  const [quickMessage, setQuickMessage] = useState('');
  const [quickMessageSent, setQuickMessageSent] = useState(false);
  const [quickMessageError, setQuickMessageError] = useState('');
  const [templateSent, setTemplateSent] = useState(false);
  const [templateError, setTemplateError] = useState('');
  const [scheduledMessage, setScheduledMessage] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [messageScheduled, setMessageScheduled] = useState(false);
  const [scheduleError, setScheduleError] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [customMessageSent, setCustomMessageSent] = useState(false);
  const [customMessageError, setCustomMessageError] = useState('');
  const [recipients, setRecipients] = useState('');
  const [includeLocation, setIncludeLocation] = useState(true);
  const [messageHistory, setMessageHistory] = useState([]);
  const [showMessageHistory, setShowMessageHistory] = useState(false);

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

  // Get location helper function
  const getLocation = async () => {
    if (!includeLocation) return '';
    if (navigator.geolocation) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
        });
        return `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`;
      } catch (error) {
        console.log('Location not available');
        return '';
      }
    }
    return '';
  };

  // Quick message handler
  const handleQuickMessage = async () => {
    if (!quickMessage.trim()) return;
    
    setQuickMessageSent(false);
    setQuickMessageError('');
    
    try {
      const location = await getLocation();
      const res = await fetch('http://localhost:5000/quick-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: quickMessage, 
          recipients: recipients || undefined,
          location 
        }),
      });
      
      const data = await res.json();
      if (data.success) {
        setQuickMessageSent(true);
        setQuickMessage('');
        setTimeout(() => setQuickMessageSent(false), 3000);
        loadMessageHistory();
      } else {
        setQuickMessageError('Failed to send quick message.');
      }
    } catch (err) {
      setQuickMessageError('Failed to send quick message.');
    }
  };

  // Template message handler
  const handleTemplateMessage = async (templateKey) => {
    setTemplateSent(false);
    setTemplateError('');
    
    try {
      const location = await getLocation();
      const res = await fetch('http://localhost:5000/template-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          templateKey, 
          language: lang,
          recipients: recipients || undefined,
          location 
        }),
      });
      
      const data = await res.json();
      if (data.success) {
        setTemplateSent(true);
        setTimeout(() => setTemplateSent(false), 3000);
        loadMessageHistory();
      } else {
        setTemplateError('Failed to send template message.');
      }
    } catch (err) {
      setTemplateError('Failed to send template message.');
    }
  };

  // Scheduled message handler
  const handleScheduledMessage = async () => {
    if (!scheduledMessage.trim() || !scheduledTime) return;
    
    setMessageScheduled(false);
    setScheduleError('');
    
    try {
      const location = await getLocation();
      const res = await fetch('http://localhost:5000/schedule-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: scheduledMessage, 
          scheduledTime,
          recipients: recipients || undefined,
          location 
        }),
      });
      
      const data = await res.json();
      if (data.success) {
        setMessageScheduled(true);
        setScheduledMessage('');
        setScheduledTime('');
        setTimeout(() => setMessageScheduled(false), 3000);
        loadMessageHistory();
      } else {
        setScheduleError('Failed to schedule message.');
      }
    } catch (err) {
      setScheduleError('Failed to schedule message.');
    }
  };

  // Custom message handler
  const handleCustomMessage = async () => {
    if (!customMessage.trim()) return;
    
    setCustomMessageSent(false);
    setCustomMessageError('');
    
    try {
      const location = await getLocation();
      const res = await fetch('http://localhost:5000/quick-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: customMessage, 
          recipients: recipients || undefined,
          location 
        }),
      });
      
      const data = await res.json();
      if (data.success) {
        setCustomMessageSent(true);
        setCustomMessage('');
        setTimeout(() => setCustomMessageSent(false), 3000);
        loadMessageHistory();
      } else {
        setCustomMessageError('Failed to send custom message.');
      }
    } catch (err) {
      setCustomMessageError('Failed to send custom message.');
    }
  };

  // Load message history
  const loadMessageHistory = async () => {
    try {
      const res = await fetch('http://localhost:5000/messages');
      const data = await res.json();
      setMessageHistory(data.messages || []);
    } catch (err) {
      console.log('Failed to load message history');
    }
  };

  // Load message history on component mount
  useEffect(() => {
    loadMessageHistory();
  }, []);

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
      <ScrollVelocity texts={['WOMEN SAFETY']} velocity={80} className="custom-scroll-text" />
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

        <section className="messaging-section">
          <h2>{t.messaging}</h2>
          
          {/* Recipients and Location Settings */}
          <div className="message-settings">
            <input
              type="text"
              placeholder={t.recipientsPlaceholder}
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
              className="recipients-input"
            />
            <label className="location-checkbox">
              <input
                type="checkbox"
                checked={includeLocation}
                onChange={(e) => setIncludeLocation(e.target.checked)}
              />
              {t.location}
            </label>
          </div>

          {/* Quick Message */}
          <div className="quick-message-container">
            <h3>{t.quickMessage}</h3>
            <div className="quick-message-input">
              <input
                type="text"
                placeholder={t.quickMessagePlaceholder}
                value={quickMessage}
                onChange={(e) => setQuickMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleQuickMessage()}
              />
              <button onClick={handleQuickMessage} disabled={!quickMessage.trim() || quickMessageSent}>
                {quickMessageSent ? t.quickMessageSent : t.sendQuickMessage}
              </button>
            </div>
            {quickMessageError && <p className="error-msg">{quickMessageError}</p>}
          </div>

          {/* Message Templates */}
          <div className="templates-container">
            <h3>{t.templates}</h3>
            <div className="template-buttons">
              <button onClick={() => handleTemplateMessage('safe-arrival')} disabled={templateSent}>
                {t.safeArrival}
              </button>
              <button onClick={() => handleTemplateMessage('running-late')} disabled={templateSent}>
                {t.runningLate}
              </button>
              <button onClick={() => handleTemplateMessage('need-help')} disabled={templateSent}>
                {t.needHelp}
              </button>
              <button onClick={() => handleTemplateMessage('check-in')} disabled={templateSent}>
                {t.checkIn}
              </button>
            </div>
            {templateError && <p className="error-msg">{templateError}</p>}
            {templateSent && <p className="success-msg">{t.templateSent}</p>}
          </div>

          {/* Custom Message */}
          <div className="custom-message-container">
            <h3>{t.customMessage}</h3>
            <textarea
              placeholder={t.customMessagePlaceholder}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              rows="3"
            />
            <button onClick={handleCustomMessage} disabled={!customMessage.trim() || customMessageSent}>
              {customMessageSent ? t.customMessageSent : t.sendCustomMessage}
            </button>
            {customMessageError && <p className="error-msg">{customMessageError}</p>}
          </div>

          {/* Scheduled Message */}
          <div className="scheduled-message-container">
            <h3>{t.scheduledMessage}</h3>
            <div className="schedule-inputs">
              <textarea
                placeholder={t.customMessagePlaceholder}
                value={scheduledMessage}
                onChange={(e) => setScheduledMessage(e.target.value)}
                rows="3"
              />
              <input
                type="datetime-local"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
              />
              <button onClick={handleScheduledMessage} disabled={!scheduledMessage.trim() || !scheduledTime || messageScheduled}>
                {messageScheduled ? t.messageScheduled : t.scheduleMessage}
              </button>
            </div>
            {scheduleError && <p className="error-msg">{scheduleError}</p>}
          </div>

          {/* Message History */}
          <div className="message-history-container">
            <h3>{t.messageHistory}</h3>
            <button 
              className="toggle-history-btn"
              onClick={() => setShowMessageHistory(!showMessageHistory)}
            >
              {showMessageHistory ? 'Hide History' : 'Show History'}
            </button>
            {showMessageHistory && (
              <div className="message-history">
                {messageHistory.length === 0 ? (
                  <p>{t.noMessages}</p>
                ) : (
                  <div className="history-list">
                    {messageHistory.map((msg) => (
                      <div key={msg.id} className="history-item">
                        <div className="history-header">
                          <span className="history-type">{msg.type}</span>
                          <span className="history-time">
                            {new Date(msg.timestamp).toLocaleString()}
                          </span>
                        </div>
                        {msg.message && <p className="history-message">{msg.message}</p>}
                        {msg.location && <p className="history-location">📍 {msg.location}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
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
