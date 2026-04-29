import React, { useState } from 'react';
import { checkEligibility } from '../utils/electionLogic';
import type { UserData, EligibilityResult } from '../types/index';
import { FiChevronRight } from 'react-icons/fi';

interface EligibilityCheckerProps {
  onEligibilityResult: (result: EligibilityResult, userData: UserData) => void;
}

const EligibilityChecker: React.FC<EligibilityCheckerProps> = ({ onEligibilityResult }) => {
  const [userData, setUserData] = useState<UserData>({
    age: 0,
    citizenship: '',
    residenceState: '',
    residenceDistrict: '',
    name: '',
    hasVoterId: false,
  });
  const [result, setResult] = useState<EligibilityResult | null>(null);

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const age = parseInt(e.target.value) || 0;
    setUserData({ ...userData, age });
  };

  const handleCitizenshipChange = (citizenship: string) => {
    setUserData({ ...userData, citizenship });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, name: e.target.value });
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, residenceState: e.target.value });
  };

  const handleCheckEligibility = () => {
    if (!userData.name || userData.age === 0 || !userData.citizenship) {
      alert('Please fill all required fields');
      return;
    }
    const eligibilityResult = checkEligibility(userData);
    setResult(eligibilityResult);
    onEligibilityResult(eligibilityResult, userData);
  };

  return (
    <div className="eligibility-container">
      <div className="eligibility-card">
        <h2>🏛️ Check Your Eligibility</h2>
        <p className="subtitle">Let's find out if you can vote in Indian elections</p>

        {!result ? (
          <div className="form-section">
            <div className="form-step">
              <label>Step 1: What's your name?</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={userData.name}
                onChange={handleNameChange}
                className="form-input"
              />
            </div>

            <div className="form-step">
              <label>Step 2: How old are you?</label>
              <input
                type="number"
                placeholder="Enter your age"
                value={userData.age || ''}
                onChange={handleAgeChange}
                className="form-input"
              />
            </div>

            <div className="form-step">
              <label>Step 3: Are you an Indian citizen?</label>
              <div className="button-group">
                <button
                  className={`choice-btn ${userData.citizenship === 'Indian' ? 'active' : ''}`}
                  onClick={() => handleCitizenshipChange('Indian')}
                >
                  Yes, Indian Citizen
                </button>
                <button
                  className={`choice-btn ${userData.citizenship === 'Non-Indian' ? 'active' : ''}`}
                  onClick={() => handleCitizenshipChange('Non-Indian')}
                >
                  No, Not Citizen
                </button>
              </div>
            </div>

            <div className="form-step">
              <label>Step 4: Which state do you live in?</label>
              <input
                type="text"
                placeholder="Enter your state name"
                value={userData.residenceState}
                onChange={handleStateChange}
                className="form-input"
              />
            </div>

            <button className="check-btn" onClick={handleCheckEligibility}>
              Check My Eligibility <FiChevronRight />
            </button>
          </div>
        ) : (
          <div className="result-section">
            <div className={`result-box ${result.isEligible ? 'eligible' : 'not-eligible'}`}>
              <h3>{result.isEligible ? '✅ Great News!' : '❌ Not Eligible'}</h3>
              <p>{result.reason}</p>

              <div className="next-steps">
                <h4>Next Steps:</h4>
                <ul>
                  {result.nextSteps.map((step, idx) => (
                    <li key={idx}>
                      <span className="step-number">{idx + 1}</span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button className="reset-btn" onClick={() => { setResult(null); setUserData({ age: 0, citizenship: '', residenceState: '', residenceDistrict: '', name: '', hasVoterId: false }); }}>
              Check Another Person
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EligibilityChecker;
