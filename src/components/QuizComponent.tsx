import React, { useState } from 'react';
import { getQuizQuestions } from '../utils/electionLogic';
import { FiRotateCcw } from 'react-icons/fi';

const QuizComponent: React.FC = () => {
  const questions = getQuizQuestions();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (optionIndex: number) => {
    if (!showResults) {
      const newAnswers = [...selectedAnswers];
      newAnswers[currentQuestion] = optionIndex;
      setSelectedAnswers(newAnswers);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let score = 0;
    selectedAnswers.forEach((answer, idx) => {
      if (answer === questions[idx].correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const handleResetQuiz = () => {
    setSelectedAnswers(Array(questions.length).fill(-1));
    setShowResults(false);
    setCurrentQuestion(0);
  };

  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);

  const question = questions[currentQuestion];

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <h2>🧠 Election Knowledge Quiz</h2>
        <p className="subtitle">Test your understanding of the Indian election system</p>

        {!showResults ? (
          <div className="quiz-content">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>
            </div>

            <div className="question-counter">
              Question {currentQuestion + 1} of {questions.length}
            </div>

            <div className="question-box">
              <h3>{question.question}</h3>

              <div className="options-container">
                {question.options.map((option, idx) => (
                  <button
                    key={idx}
                    className={`option-btn ${selectedAnswers[currentQuestion] === idx ? 'selected' : ''}`}
                    onClick={() => handleAnswerSelect(idx)}
                    disabled={showResults}
                  >
                    <span className="option-letter">{String.fromCharCode(65 + idx)}.</span>
                    <span className="option-text">{option}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="quiz-navigation">
              <button
                className="nav-btn prev-btn"
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
              >
                ← Previous
              </button>

              {currentQuestion < questions.length - 1 ? (
                <button className="nav-btn next-btn" onClick={handleNextQuestion}>
                  Next →
                </button>
              ) : (
                <button className="nav-btn submit-btn" onClick={handleSubmitQuiz}>
                  Submit Quiz
                </button>
              )}
            </div>

            <div className="quiz-indicator">
              {selectedAnswers.map((answer, idx) => (
                <div
                  key={idx}
                  className={`indicator-dot ${answer !== -1 ? 'answered' : ''} ${idx === currentQuestion ? 'current' : ''}`}
                  onClick={() => setCurrentQuestion(idx)}
                  title={`Question ${idx + 1}`}
                ></div>
              ))}
            </div>
          </div>
        ) : (
          <div className="quiz-results">
            <div className={`result-summary ${percentage >= 70 ? 'excellent' : percentage >= 50 ? 'good' : 'fair'}`}>
              <h3>Quiz Complete!</h3>
              <div className="score-display">
                <div className="score-circle">
                  <span className="score-number">{score}</span>
                  <span className="score-total">/ {questions.length}</span>
                </div>
                <div className="score-percentage">{percentage}%</div>
              </div>

              {percentage >= 70 && (
                <p className="result-message">🎉 Excellent! You have a great understanding of the election process!</p>
              )}
              {percentage >= 50 && percentage < 70 && (
                <p className="result-message">👍 Good job! Review the explanation for any missed questions.</p>
              )}
              {percentage < 50 && (
                <p className="result-message">📚 Keep learning! Read the explanations to improve your knowledge.</p>
              )}
            </div>

            <div className="detailed-results">
              <h4>Review Your Answers:</h4>
              {questions.map((q, idx) => (
                <div
                  key={q.id}
                  className={`result-item ${selectedAnswers[idx] === q.correctAnswer ? 'correct' : 'incorrect'}`}
                >
                  <div className="result-question">
                    <span className="result-number">{idx + 1}.</span>
                    <strong>{q.question}</strong>
                    {selectedAnswers[idx] === q.correctAnswer ? <span className="badge correct">✓ Correct</span> : <span className="badge incorrect">✗ Incorrect</span>}
                  </div>
                  <p className="your-answer">Your answer: <em>{q.options[selectedAnswers[idx]]}</em></p>
                  <p className="correct-answer">Correct answer: <em>{q.options[q.correctAnswer]}</em></p>
                  <p className="explanation">{q.explanation}</p>
                </div>
              ))}
            </div>

            <button className="reset-btn" onClick={handleResetQuiz}>
              <FiRotateCcw /> Retake Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizComponent;
