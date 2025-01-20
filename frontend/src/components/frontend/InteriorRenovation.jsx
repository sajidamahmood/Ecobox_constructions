import React from "react";
import "./Extension.css"; 
import UpperBar from '../common/UpperBar'; 
import HeaderNavigation from '../common/HeaderNavigation'
import FooterBanner from '../common/FooterBanner';
import Interior from "../frontend/Interior";
import Hero from '../common/Hero';





const  InteriorRenovation = () => {


  return (
    <>
         <UpperBar/>
        <HeaderNavigation />

<main>
<Hero/>
    <div className="construction-veranda">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
  <a href="/">Home</a> &gt; <a href="/interior-renovation">Interior Renovation</a> &gt; 
</nav>


      <h1>Rénovation Intérieure</h1>

      <header className="header">
        <p>
        Rénovation de maison et d’appartement, travaux d’aménagement de combles, optimisation de l’isolation, rénovation de salle de bain, de cuisine, pose de parquet, carrelage, peinture…

        </p>
      </header>
      <Interior/>      
    </div>
    </main>
    <FooterBanner />

    </>
  );
};

export default InteriorRenovation;
