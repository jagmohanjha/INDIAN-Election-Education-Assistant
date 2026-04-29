import React, { useState } from 'react';
import { FiHome, FiCheckCircle, FiFileText, FiCheckSquare, FiBook, FiHelpCircle, FiCalendar, FiMenu, FiX } from 'react-icons/fi';
import EligibilityChecker from './components/EligibilityChecker';
import RegistrationGuide from './components/RegistrationGuide';
import VotingGuide from './components/VotingGuide';
import QuizComponent from './components/QuizComponent';
import FAQs from './components/FAQs';
import Timeline from './components/Timeline';
import './App.css';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: <FiHome /> },
    { id: 'eligibility', label: 'Check Eligibility', icon: <FiCheckCircle /> },
    { id: 'registration', label: 'Registration', icon: <FiFileText /> },
    { id: 'voting', label: 'How to Vote', icon: <FiCheckSquare /> },
    { id: 'quiz', label: 'Quiz', icon: <FiBook /> },
    { id: 'faqs', label: 'FAQs', icon: <FiHelpCircle /> },
    { id: 'timeline', label: 'Timeline', icon: <FiCalendar /> },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'eligibility':
        return <EligibilityChecker onEligibilityResult={(result, userData) => console.log(result, userData)} />;
      case 'registration':
        return <RegistrationGuide />;
      case 'voting':
        return <VotingGuide />;
      case 'quiz':
        return <QuizComponent />;
      case 'faqs':
        return <FAQs />;
      case 'timeline':
        return <Timeline />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app-wrapper">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🇮🇳</span>
            <h1>Election Education Assistant</h1>
          </div>
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </header>

      <div className="app-container">
        {/* Sidebar Navigation */}
        <nav className={`app-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main Content */}
        <main className="app-main">
          <div className="content-wrapper">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <p>🇮🇳 Election Education Assistant | Promoting democratic participation | © 2026</p>
        <p className="footer-info">
          Information sourced from Election Commission of India | 
          <a href="https://www.eci.gov.in/" target="_blank" rel="noopener noreferrer"> Visit Official ECI Website</a>
        </p>
      </footer>
    </div>
  );
}

// Home Component
function Home() {
  return (
    <div className="home-container">
      <div className="hero">
        <h2>Welcome to Election Education Assistant 🗳️</h2>
        <p className="hero-subtitle">
          Your interactive guide to understanding and participating in Indian elections
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Check Eligibility</h3>
            <p>Find out if you're eligible to vote with our simple eligibility checker</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Registration Guide</h3>
            <p>Step-by-step guide to register as a voter</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🗳️</div>
            <h3>Voting Guide</h3>
            <p>Learn how to cast your vote on polling day</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🧠</div>
            <h3>Knowledge Quiz</h3>
            <p>Test your understanding of the election system</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">❓</div>
            <h3>FAQs</h3>
            <p>Find answers to common questions about voting</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Election Timeline</h3>
            <p>Know important dates and phases of elections</p>
          </div>
        </div>
      </div>

      <div className="intro-section">
        <h3>Why Vote? Why Elections Matter?</h3>
        <div className="reason-cards">
          <div className="reason-card">
            <h4>🏛️ Democratic Right</h4>
            <p>Your vote is your voice in democracy. Voting is a fundamental right of every citizen.</p>
          </div>

          <div className="reason-card">
            <h4>👥 Choose Your Leaders</h4>
            <p>Elections help you choose representatives who will make decisions on your behalf.</p>
          </div>

          <div className="reason-card">
            <h4>🌍 Influence Change</h4>
            <p>Your vote contributes to policies and changes that affect your community and nation.</p>
          </div>

          <div className="reason-card">
            <h4>💪 Empowerment</h4>
            <p>Voting empowers you to be part of the decision-making process at all levels.</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h3>Ready to Learn More?</h3>
        <p>Use the navigation menu to explore different aspects of the election process.</p>
        <div className="cta-buttons">
          <button className="cta-btn primary" onClick={() => { /* navigate to eligibility */ }}>
            ✅ Check Your Eligibility
          </button>
          <button className="cta-btn secondary" onClick={() => { /* navigate to voting guide */ }}>
            🗳️ Learn to Vote
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
