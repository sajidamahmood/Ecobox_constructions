import React from "react";
import "./QualitySection.css"; // Import the updated CSS file

const QualitySection = () => {
  return (
    <div className="quality-section">
      {/* Card 1 */}
      <div className="quality-card1">
        
        <div className="quality-card1-content">
          <div className="quality-card1-title">Notre charte qualité</div>
          <div className="quality-card1-subtitle">
            Pour vous nos artisans s'engagent
          </div>
          <div className="quality-card1-description">
            Avec la Charte Qualité Travaux, nos artisans s’engagent sur la
            qualité et le sérieux de leur prestation.
          </div>
          <a
            href="/who-we-are"
            className="quality-card-button"
          >
            EN SAVOIR PLUS SUR NOTRE CHARTE
          </a>
        </div>
      </div>

      {/* Card 2 */}
      <div className="quality-card">
        
        <div className="quality-card-content">
          <div className="quality-card-title">Notre réseau d'architectes</div>
          <div className="quality-card-subtitle">
            Trouvez l'architecte qui vous correspond
          </div>
          <div className="quality-card-description">
            Faites réaliser, au meilleur prix, un projet adapté à vos besoins,
            en choisissant un des architectes de notre réseau.
          </div>
          <a
            href="/ContactUs"
            className="quality-card-button"
          >
            EN SAVOIR PLUS SUR NOTRE RÉSEAU
          </a>
        </div>
      </div>
    </div>
  );
};

export default QualitySection;
