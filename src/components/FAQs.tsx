import React, { useState } from 'react';
import { getFAQs } from '../utils/electionLogic';
import { FiChevronDown } from 'react-icons/fi';

const FAQs: React.FC = () => {
  const faqs = getFAQs();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = Array.from(new Set(faqs.map((faq) => faq.category)));

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="faq-container">
      <div className="faq-card">
        <h2>❓ Frequently Asked Questions</h2>
        <p className="subtitle">Find answers to common questions about voting and elections</p>

        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {searchTerm === '' && (
          <div className="category-tabs">
            {categories.map((category) => (
              <button key={category} className="category-tab">
                {category}
              </button>
            ))}
          </div>
        )}

        <div className="faq-list">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, idx) => (
              <div
                key={idx}
                className={`faq-item ${expandedId === idx ? 'expanded' : ''}`}
                onClick={() => setExpandedId(expandedId === idx ? null : idx)}
              >
                <div className="faq-header">
                  <div className="faq-question">
                    <span className="category-badge">{faq.category}</span>
                    <h4>{faq.question}</h4>
                  </div>
                  <FiChevronDown className={`faq-icon ${expandedId === idx ? 'rotated' : ''}`} />
                </div>

                {expandedId === idx && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No FAQs found. Try a different search term!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
