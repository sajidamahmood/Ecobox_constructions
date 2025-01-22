import React from 'react';
import './Header.css';


const Header = () => (
  <header className="dashboard-header">
    <input type="text" placeholder="Search" className="search-bar" />
    <div className="header-icons">
    <button className="devis-btn">Devis</button>
    <button className="facture-btn">Facture</button>
      <button className="settings-btn">⚙️</button>
      <button className="profile-btn">👤</button>
      
    </div>
  </header>
);

export default Header;
