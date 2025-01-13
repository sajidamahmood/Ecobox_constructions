import React from "react";
import "./Extension.css"; 
import UpperBar from '../common/UpperBar'; 
import HeaderNavigation from '../common/HeaderNavigation'
import FooterBanner from '../common/FooterBanner';
import Services from "../frontend/Services";


const ConstructionVeranda = () => {


  return (
    <>
         <UpperBar/>
        <HeaderNavigation />

<main>

    <div className="construction-veranda">
      <nav className="breadcrumb">
        <a href="/">Home</a> &gt; <a href="/extension">Extension</a> &gt; 
      </nav>

      <h1>Construction d'extension</h1>

      <header className="header">
        <p>
          Une nouvelle pièce à vivre, tout en profitant de la luminosité extérieure, c'est
          possible grâce à la véranda ! Conseils personnalisés, devis gratuits.
        </p>
      </header>
      <Services/>

    </div>
    </main>
    <FooterBanner />

    </>
  );
};

export default ConstructionVeranda;
