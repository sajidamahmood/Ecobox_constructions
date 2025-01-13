import React from 'react';

const Hero = ({ preHeading, heading, text }) => {
  
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content text-center">
          <span className="pre-heading">{preHeading}</span>
          <h1 className="heading">{heading}</h1>
          <p className="hero-text" dangerouslySetInnerHTML={{__html:text}}></p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
