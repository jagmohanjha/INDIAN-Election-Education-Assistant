import React from 'react';
import { getElectionTimeline } from '../utils/electionLogic';
import { FiCalendar, FiAlertCircle, FiCheckCircle, FiClock } from 'react-icons/fi';

const Timeline: React.FC = () => {
  const timeline = getElectionTimeline();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <FiCheckCircle className="status-icon completed" />;
      case 'ongoing':
        return <FiClock className="status-icon ongoing" />;
      default:
        return <FiAlertCircle className="status-icon upcoming" />;
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="timeline-container">
      <div className="timeline-card">
        <h2>📅 Election Timeline</h2>
        <p className="subtitle">Key dates and phases of the election process</p>

        <div className="timeline">
          {timeline.map((event, idx) => (
            <div
              key={idx}
              className={`timeline-event status-${event.status}`}
            >
              <div className="timeline-marker">
                {getStatusIcon(event.status)}
              </div>

              <div className="timeline-content">
                <div className="event-header">
                  <h4>{event.phase}</h4>
                  <span className={`status-badge ${event.status}`}>
                    {getStatusLabel(event.status)}
                  </span>
                </div>

                <p className="event-description">{event.description}</p>

                <div className="event-date">
                  <FiCalendar /> {event.date}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="timeline-legend">
          <h4>Legend:</h4>
          <div className="legend-items">
            <div className="legend-item">
              <FiCheckCircle className="legend-icon completed" />
              <span>Completed</span>
            </div>
            <div className="legend-item">
              <FiClock className="legend-icon ongoing" />
              <span>Ongoing</span>
            </div>
            <div className="legend-item">
              <FiAlertCircle className="legend-icon upcoming" />
              <span>Upcoming</span>
            </div>
          </div>
        </div>

        <div className="timeline-notes">
          <h4>📌 Important Notes:</h4>
          <ul>
            <li>Dates are subject to announcement by the Election Commission of India</li>
            <li>Different states may have different election dates</li>
            <li>State elections may be held at different times than general elections</li>
            <li>Check official ECI website for latest updates</li>
            <li>Subscribe to notifications for important dates</li>
          </ul>
        </div>

        <div className="timeline-action">
          <a href="https://www.eci.gov.in/" target="_blank" rel="noopener noreferrer" className="action-link">
            <FiCalendar /> Visit Election Commission for Latest Updates
          </a>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
