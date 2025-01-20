import React from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';


const Footer = () => {
  return (

    <footer className="footer">
      <div className="footer-container">
        {/* Columns */}
        <div className="footer-columns">
          <div className="footer-column">
            <h3>AGENCE DE CLERMONT-FERRAND / RIOM</h3>
            <ul>
              <li>Qui sommes-nous</li>
              <li>Notre charte qualité</li>
              <li>Trouver une agence</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>NOS DOMAINES D’INTERVENTION</h3>
            <ul>
              <li>EXTENSION</li>
              <li>RÉNOVATION INTÉRIEURE</li>
              <li>TRAVAUX EXTÉRIEURS</li>
            </ul>
            <ul>
            </ul>
            <br/>
            <a href="/ContactUs" className="cta-button">Des travaux pour les pros ?
            </a>
          </div>
          <div className="footer-column">
            <h3>NOS GUIDES THÉMATIQUES</h3>
            <ul>
              <li>Rénovation de résidence secondaire</li>
              <li>Rénovation de Maison</li>
              <li>Rénovation d'appartement</li>
              <li>Construction de véranda</li>
              <li>Extension en bois</li>
            </ul>
          </div>
          {/* Newsletter and Whitepaper */}
          <div>
  {/* 
  <div className="footer-column">
    <div className="newletter mb-5">
      <h3>S’INSCRIRE À LA NEWSLETTER</h3>
      <form className="newsletter-form">
        <input type="email" placeholder="Adresse e-mail" />
        <input type="text" placeholder="Code postal" />
        <button type="submit">S’INSCRIRE</button>
      </form>
    </div>
  </div> 
  */}
</div>
        </div>

        {/* Bottom Row */}
        <div className="footer-bottom">
          <div className="footer-search">
          <span>Copyright © 2024 Ecoboxenergie. Tous droits réservés.</span>
          </div>
          <div className="footer-social">

<div className="footer-social">
  <div className="social-icons">
    <a href="#facebook" className="social-icon">
      <FaFacebookF />
    </a>
    <a href="#linkedin" className="social-icon">
      <FaLinkedinIn />
    </a>
    <a href="#instagram" className="social-icon">
      <FaInstagram />
    </a>
  </div>
</div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
