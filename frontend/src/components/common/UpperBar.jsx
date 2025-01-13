import React from 'react';
import './UpperBar.css'; // Import the CSS file

const upperBar = () => {
  return (
    
    <div className="upper-bar">
    <div className="upper-bar-content">
      <div className="icon-text">
        <span className="icon">📄</span>
        <span>devis gratuit</span>
      </div>
      <div className="icon-text">
        <span className="icon">⏰</span>
        <span>réponse dans les 24 heures</span>
      </div>
      <div className="icon-text">
        <span className="icon">💰</span>
        <span>meilleur rapport qualité/prix</span>
      </div>
      <div className="icon-text">
        <span className="icon">🛠️</span>
        <span>Des artisans de qualité</span>
      </div>
      <div className="icon-text">
        <span className="icon">📍</span>
        <span>meilleure agence dans toute la France</span>
      </div>
    </div>
  </div>
    
  );
};

export default upperBar;
