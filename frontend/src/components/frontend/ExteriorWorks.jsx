import React from "react";
import "./Extension.css"; 
import UpperBar from '../common/UpperBar'; 
import HeaderNavigation from '../common/HeaderNavigation'
import FooterBanner from '../common/FooterBanner';
import Projects from "../frontend/Projects";





const  ExteriorWorks = () => {


  return (
    <>
         <UpperBar/>
        <HeaderNavigation />

<main>

    <div className="construction-veranda">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
  <a href="/">Home</a> &gt; <a href="/exterior-works">Travaux Extérieurs</a> &gt; 
</nav>


      <h1>Travaux Extérieurs</h1>

      <header className="header">
        <p>
        Ravalement de façade, isolation thermique par l’extérieur, travaux de maçonnerie, charpente, toiture, création de terrasse, piscine, aménagement de jardin, allées, clôtures…
        </p>
      </header>
      <Projects/>

    </div>
    </main>
    <FooterBanner />

    </>
  );
};

export default ExteriorWorks;
