import React, { useState } from 'react';
import { getVotingSteps } from '../utils/electionLogic';
import { FiMapPin, FiClock } from 'react-icons/fi';

const VotingGuide: React.FC = () => {
  const steps = getVotingSteps();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="voting-container">
      <div className="voting-card">
        <h2>🗳️ How to Vote - Step by Step</h2>
        <p className="subtitle">Learn the complete voting process on polling day</p>

        <div className="steps-timeline" role="tablist" aria-label="Voting steps">
          {steps.map((step, idx) => (
            <button
              key={step.step}
              type="button"
              className={`timeline-item ${activeStep === idx ? 'active' : ''}`}
              onClick={() => setActiveStep(idx)}
              aria-pressed={activeStep === idx}
            >
              <div className="timeline-marker">
                <span className="step-number">{step.step}</span>
              </div>
              <div className="timeline-content">
                <h4>{step.title}</h4>
              </div>
            </button>
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
                <>
                  <p className="info-text">
                    🔍 Visit <strong>https://voters.eci.gov.in/</strong> to find your polling booth.
                  </p>
                  <a href="https://voters.eci.gov.in/" target="_blank" rel="noopener noreferrer" className="action-link">
                    <FiMapPin /> Find Your Polling Booth
                  </a>
                </>
              )}
              {activeStep === 1 && (
                <div className="time-info">
                  <FiClock /> Polling Hours: Usually 7:00 AM to 6:00 PM
                  <p>Note: Hours may vary. Check your local election office.</p>
                </div>
              )}
              {activeStep === 2 && (
                <div className="id-list">
                  <p className="info-text">Accepted IDs:</p>
                  <ul>
                    <li>Voter ID Card (EPIC)</li>
                    <li>Aadhaar Card</li>
                    <li>Passport</li>
                    <li>Driving License</li>
                    <li>PAN Card</li>
                  </ul>
                </div>
              )}
            </div>

            {activeStep === 5 && (
              <div className="evm-info">
                <h5>🖥️ How to Use EVM:</h5>
                <ol>
                  <li>After verification, go to the EVM machine</li>
                  <li>You'll see buttons for each candidate</li>
                  <li>Find your preferred candidate and press their button</li>
                  <li>You'll hear a beep sound confirming your vote</li>
                  <li>You cannot change your vote after pressing</li>
                  <li>NOTA button is always available</li>
                </ol>
              </div>
            )}
          </div>
        </div>

        <div className="voting-dos-donts">
          <div className="dos">
            <h4>✅ DOs:</h4>
            <ul>
              <li>Bring a valid ID</li>
              <li>Reach early to avoid queues</li>
              <li>Vote for whom you believe in</li>
              <li>Keep your voter slip safe</li>
              <li>Encourage others to vote</li>
            </ul>
          </div>
          <div className="donts">
            <h4>❌ DON'Ts:</h4>
            <ul>
              <li>Don't go without ID</li>
              <li>Don't take photos inside booth</li>
              <li>Don't campaign inside voting center</li>
              <li>Don't vote on someone else's behalf</li>
              <li>Don't press multiple buttons</li>
            </ul>
          </div>
        </div>

        <div className="voting-rights">
          <h4>🛡️ Your Voting Rights:</h4>
          <ul>
            <li>Your vote is completely confidential and secret</li>
            <li>You have the right to cast NOTA vote</li>
            <li>You can request postal ballot if you're away</li>
            <li>Voting is free and safe</li>
            <li>No one can force you to vote for anyone</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VotingGuide;
