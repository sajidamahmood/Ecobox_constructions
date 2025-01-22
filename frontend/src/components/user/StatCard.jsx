import React from 'react';

const StatCard = ({ title, amount, color }) => (
  <div className={`stat-card ${color}`}>
    <h2>{amount}</h2>
    <p>{title}</p>
  </div>
);

export default StatCard;
