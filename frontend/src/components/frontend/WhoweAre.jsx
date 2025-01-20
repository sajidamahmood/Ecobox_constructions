import React from 'react';
import './WhoweAre.css'; 
import UpperBar from '../common/UpperBar'; 
import HeaderNavigation from '../common/HeaderNavigation'
import FooterBanner from '../common/FooterBanner';
import Hero from '../common/Hero';




const WhoweAre = () => {


  return (

    <>
    <UpperBar/>
   <HeaderNavigation />

<main>
<Hero/>

    <div className='Container'>

    <div className="network-page">
      <div className="header-section">
        <h1>Notre réseau de courtiers en travaux</h1>
        <p>
        Vous projetez de réaliser des travaux de construction, de rénovation habitat ou d’extension habitat ? Comme il est souvent fastidieux pour les particuliers de trouver des entreprises de confiance et des artisans fiables pour réaliser des travaux, il est nécessaire de faire appel à un courtier en travaux. Découvrez en quoi consiste le rôle d’un courtier en travaux et quelles sont ses principales missions.
        </p>
      </div>

      {/* Information Cards Section */}
      <div className="info-cards">
        <div className="card">
          <h3>NOUS VOUS SIMPLIFIONS VOS TRAVAUX</h3>
          <p>
            Votre courtier Ecobox energie vous aide à mener à bien vos projets de travaux :
          </p>
          <ul>
            <li>Il vous propose des solutions et des chiffrages précis de vos projets, gratuitement et sans engagement de votre part.</li>
            <li>Il sélectionne pour vous des professionnels issus des différents corps de métier du bâtiment (extérieur, intérieur, énergies renouvelables, modification de l'habitat) qui ont signé notre Charte Qualité Travaux.</li>
          </ul>
        </div>
        <div className="card">
          <h3>UN INTERLOCUTEUR UNIQUE ET DE VRAIS AVANTAGES</h3>
          <p>
          Les services de courtage en travaux sont gratuits pour vous :</p>
          <ul>
            <li>Nos courtiers se chargent de vous mettre en relation avec nos partenaires du bâtiment, financiers et spécialisés dans l'assurance, professionnels que nous avons sélectionnés pour leur sérieux et la qualité de leurs prestations.</li>
            <li>Avec la Carte Avantages Ecobox energie, vous avez accès à notre panel de partenaires négociants en matériaux afin de bénéficier de tarifs préférentiels et de conseils de professionnels.</li>
          </ul>
        </div>
        <div className="card">
          <h3>DES GARANTIES POUR RÉUSSIR VOS PROJETS EN TOUTE CONFIANCE</h3>
          <p>
          Ecoboxenergie, c'est la garantie de réaliser vos projets de façon plus simple, et plus économique :
          </p>
          <ul>
            <li>Des professionnels fiables, signataires de notre Charte Qualité Travaux.</li>
            <li>TUn réel gain de temps dans votre consultation d'entre prises du bâtiment.</li>
            <li>BL'obtention de devis offrant un rapport qualité prix optimal expliqué par votre courtier.</li>
          </ul>
        </div>
      </div>
    </div>
    </div>
    </main>
    <FooterBanner />

    </>
  );
};

export default WhoweAre;
