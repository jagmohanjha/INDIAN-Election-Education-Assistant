import React, { useState } from 'react';
import { getRegistrationSteps } from '../utils/electionLogic';
import { FiFileText } from 'react-icons/fi';

const RegistrationGuide: React.FC = () => {
  const steps = getRegistrationSteps();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="registration-container">
      <div className="registration-card">
        <h2>📋 Voter Registration Guide</h2>
        <p className="subtitle">Follow these simple steps to register as a voter</p>

        <div className="steps-timeline">
          {steps.map((step, idx) => (
            <div
              key={step.step}
              className={`timeline-item ${activeStep === idx ? 'active' : ''}`}
              onClick={() => setActiveStep(idx)}
            >
              <div className="timeline-marker">
                <span className="step-number">{step.step}</span>
              </div>
              <div className="timeline-content">
                <h4>{step.title}</h4>
              </div>
            </div>
          ))}
        </div>

        <div className="step-details">
          <div className="detail-box">
            <div className="detail-header">
              <h3>{steps[activeStep].title}</h3>
              <span className="progress">{activeStep + 1} of {steps.length}</span>
            </div>
            <p className="detail-description">{steps[activeStep].details}</p>

            <div className="action-box">
              {activeStep === 0 && (
                <a href="https://eci.gov.in/" target="_blank" rel="noopener noreferrer" className="action-link">
                  <FiFileText /> Visit Election Commission Website
                </a>
              )}
              {activeStep === 1 && (
                <p className="info-text">
                  📌 Visit your local election office. Check your state election website for office locations.
                </p>
              )}
              {activeStep === 2 && (
                <a href="https://eci.gov.in/" target="_blank" rel="noopener noreferrer" className="action-link">
                  <FiFileText /> Download Form 6 Online
                </a>
              )}
              {activeStep === 4 && (
                <p className="info-text">
                  ⏱️ Processing time is usually 7-10 working days. You can track your status on the election website.
                </p>
              )}
              {activeStep === 5 && (
                <p className="info-text">
                  🎉 Your Voter ID will be sent by post. You can also download e-EPIC (digital copy) from the website.
                </p>
              )}
            </div>

            <div className="requirements-box">
              <h5>📄 Required Documents:</h5>
              <ul>
                <li>Proof of Age: Birth Certificate, 10th Mark Sheet, Passport</li>
                <li>Proof of Citizenship: Aadhaar, PAN Card, Passport</li>
                <li>Address Proof: Utility Bill, Rental Agreement, Aadhaar</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="registration-tips">
          <h4>💡 Quick Tips:</h4>
          <ul>
            <li>You can register online at the Election Commission website</li>
            <li>Registration is free of cost</li>
            <li>You can check your registration status online</li>
            <li>Keep your documents handy for quick verification</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RegistrationGuide;
