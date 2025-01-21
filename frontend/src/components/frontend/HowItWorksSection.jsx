import React from "react";
import { Link } from 'react-router-dom';
import { useInView } from "react-intersection-observer";
import "./HowItWorksSection.css"; 


const HowItWorksSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <>
<section className='section-2 bg-light py-5'ref={ref}>
    <div className='container py-5'>
      <h1 className="title mb-5">
        Ecoboxenergie Travaux, comment ça marche ?
      </h1>
        <div className='row'>
            <div className='col-md-6'>
            <div className={`video-content ${inView ? "animate-video" : ""}`}>
            <iframe
  width="560"
  height="415"
  src="https://www.youtube.com/embed/ecjm6HVOqYo"
  title="Video Player"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>

        <div className="video_des">
						<h3>mahmood</h3>
						<p>Animateur télé présente Ecoboxenergie</p>
           

					</div>
      </div>
            </div>
        <div className="col-md-6">
    <div className={`text-content ${inView ? "animate-text" : ""}`}>
    <div className="content-section">
   
      <h3>Présentez votre projet</h3>
      <p>
        Un courtier ecoboxenergie réalise chez vous l’étude
        personnalisée de votre projet.
      </p>
      <hr />
    </div>
    <div className="content-section">
      <h3>Obtenez des devis gratuits</h3>
      <p>Profitez d’un accompagnement pour estimer vos travaux.</p>
      <hr />
    </div>
    <div className="content-section">
      <h3>Démarrez vos travaux en toute liberté</h3>
    </div>
  </div>
      </div>

        </div>

    </div>

</section>
    
   
    </>
  );
};

export default HowItWorksSection;
