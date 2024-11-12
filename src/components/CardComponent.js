import React, { useState } from 'react';
import '../styles/about.css';

const CardComponent = ({ title, subtitle, value, moreInfo }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`card ${isExpanded ? 'expanded' : ''}`} onClick={toggleExpand}>
      <div className="card-content">
        <h4>{title}</h4>
        <p className="subtitle">{subtitle}</p>
        <h1>{value}</h1>
      </div>
      {isExpanded && (
        <div className="more-info">
          <p>{moreInfo}</p>
        </div>
      )}
    </div>
  );
};

export default CardComponent;