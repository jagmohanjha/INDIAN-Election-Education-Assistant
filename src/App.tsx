import React, { Suspense, useState, lazy } from 'react';
import { FiHome, FiCheckCircle, FiFileText, FiCheckSquare, FiBook, FiHelpCircle, FiCalendar, FiMenu, FiX, FiLogOut, FiLogIn } from 'react-icons/fi';
import './App.css';
import { isFirebaseConfigured, signInUser, logoutUser } from './auth';

const EligibilityChecker = lazy(() => import('./components/EligibilityChecker'));
const RegistrationGuide = lazy(() => import('./components/RegistrationGuide'));
const VotingGuide = lazy(() => import('./components/VotingGuide'));
const QuizComponent = lazy(() => import('./components/QuizComponent'));
const FAQs = lazy(() => import('./components/FAQs'));
const Timeline = lazy(() => import('./components/Timeline'));

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

type LoggedInUser = {
  name: string;
  email: string;
};

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(() => {
    const savedUser = localStorage.getItem('election-app-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginError('');

    const { email, password } = loginForm;
    if (!email || !password) {
      setLoginError('Please enter both email and password.');
      return;
    }

    setAuthLoading(true);
    try {
      if (isFirebaseConfigured) {
        const userCredential = await signInUser(email, password);
        const user = {
          name: userCredential.user.displayName || 'Election Voter',
          email: userCredential.user.email || email,
        };
        setLoggedInUser(user);
        localStorage.setItem('election-app-user', JSON.stringify(user));
      } else {
        const validEmail = 'user@example.com';
        const validPassword = 'vote1234';

        if (email === validEmail && password === validPassword) {
          const user = { name: 'Election Voter', email };
          setLoggedInUser(user);
          localStorage.setItem('election-app-user', JSON.stringify(user));
        } else {
          setLoginError('Invalid credentials. Use user@example.com / vote1234');
        }
      }
    } catch {
      setLoginError('Unable to sign in. Please check your connection and credentials.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    if (isFirebaseConfigured) {
      try {
        await logoutUser();
      } catch {
        // Ignore logout errors and continue clearing local state.
      }
    }

    setLoggedInUser(null);
    localStorage.removeItem('election-app-user');
    setActiveSection('home');
    setMobileMenuOpen(false);
  };

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
    if (!loggedInUser) {
      return (
        <LoginCard
          loginForm={loginForm}
          onChange={(field, value) => setLoginForm({ ...loginForm, [field]: value })}
          onSubmit={handleLoginSubmit}
          error={loginError}
          loading={authLoading}
        />
      );
    }

    return (
      <Suspense fallback={<LoadingState />}>
        {activeSection === 'eligibility' && <EligibilityChecker onEligibilityResult={() => {}} />}
        {activeSection === 'registration' && <RegistrationGuide />}
        {activeSection === 'voting' && <VotingGuide />}
        {activeSection === 'quiz' && <QuizComponent />}
        {activeSection === 'faqs' && <FAQs />}
        {activeSection === 'timeline' && <Timeline />}
        {activeSection === 'home' && <Home onNavigate={setActiveSection} />}
      </Suspense>
    );
  };

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🇮🇳</span>
            <h1>Election Education Assistant</h1>
          </div>
          <div className="header-actions">
            {loggedInUser ? (
              <>
                <span className="user-badge" aria-live="polite">
                  Welcome, {loggedInUser.name}
                </span>
                <button className="logout-btn" onClick={handleLogout} type="button" aria-label="Logout and return to login screen">
                  <FiLogOut /> Logout
                </button>
              </>
            ) : (
              <span className="user-badge login-prompt">
                <FiLogIn /> Sign in to start learning
              </span>
            )}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </header>

      <div className="app-container">
        {loggedInUser && (
          <nav className={`app-nav ${mobileMenuOpen ? 'open' : ''}`} aria-label="Application navigation">
            <ul className="nav-list">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                    onClick={() => {
                      setActiveSection(item.id);
                      setMobileMenuOpen(false);
                    }}
                    type="button"
                    aria-current={activeSection === item.id ? 'page' : undefined}
                    aria-label={`Go to ${item.label}`}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <main className="app-main">
          <div className="content-wrapper">{renderContent()}</div>
        </main>
      </div>

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

interface LoginCardProps {
  loginForm: { email: string; password: string };
  onChange: (field: 'email' | 'password', value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  error: string;
  loading: boolean;
}

function LoginCard({ loginForm, onChange, onSubmit, error, loading }: LoginCardProps) {
  return (
    <div className="login-container">
      <div className="login-card card-base">
        <div className="login-header">
          <h2>Sign In</h2>
          <p>Use the sample credentials or Firebase sign-in to access election resources.</p>
        </div>

        <form className="login-form" onSubmit={onSubmit}>
          <label htmlFor="login-email">
            Email address
            <input
              id="login-email"
              type="email"
              value={loginForm.email}
              onChange={(e) => onChange('email', e.target.value)}
              className="form-input"
              placeholder="user@example.com"
              required
              aria-required="true"
            />
          </label>

          <label htmlFor="login-password">
            Password
            <input
              id="login-password"
              type="password"
              value={loginForm.password}
              onChange={(e) => onChange('password', e.target.value)}
              className="form-input"
              placeholder="vote1234"
              required
              aria-required="true"
            />
          </label>

          {error && (
            <div className="login-error" role="alert">
              {error}
            </div>
          )}

          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-help">
          <p>
            Try <strong>user@example.com</strong> and <strong>vote1234</strong> to sign in locally.
          </p>
        </div>
      </div>
    </div>
  );
}

interface HomeProps {
  onNavigate: React.Dispatch<React.SetStateAction<string>>;
}

function Home({ onNavigate }: HomeProps) {
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
          <button className="cta-btn primary" onClick={() => onNavigate('eligibility')}>
            ✅ Check Your Eligibility
          </button>
          <button className="cta-btn secondary" onClick={() => onNavigate('voting')}>
            🗳️ Learn to Vote
          </button>
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <div className="loading-spinner" />
      <p>Loading content…</p>
    </div>
  );
}

export default App;
