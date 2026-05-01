import React, { useMemo, useState } from 'react';
import { getFAQs } from '../utils/electionLogic';
import { FiChevronDown } from 'react-icons/fi';

const FAQs: React.FC = () => {
  const faqs = useMemo(() => getFAQs(), []);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(faqs.map((faq) => faq.category)))],
    [faqs],
  );

  const filteredFAQs = useMemo(
    () =>
      faqs.filter((faq) => {
        const matchesSearch =
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
        return matchesSearch && matchesCategory;
      }),
    [faqs, searchTerm, activeCategory],
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

        <div className="category-tabs" role="tablist" aria-label="FAQ categories">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`category-tab ${activeCategory === category ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory(category);
                setExpandedId(null);
              }}
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="faq-list">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, idx) => (
              <div key={idx} className={`faq-item ${expandedId === idx ? 'expanded' : ''}`}>
                <button
                  type="button"
                  className="faq-header"
                  onClick={() => setExpandedId(expandedId === idx ? null : idx)}
                  aria-expanded={expandedId === idx}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <div className="faq-question">
                    <span className="category-badge">{faq.category}</span>
                    <h4>{faq.question}</h4>
                  </div>
                  <FiChevronDown className={`faq-icon ${expandedId === idx ? 'rotated' : ''}`} />
                </button>

                {expandedId === idx && (
                  <div id={`faq-answer-${idx}`} className="faq-answer">
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
