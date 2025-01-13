import React from "react";
import "./ExternalEntryPage.css"; // For styling

const ExternalEntryPage = () => {
  return (
    <div className="external-entry-page">
      <nav className="breadcrumb">
        <span>Home</span> &raquo; <span>Travaux extérieurs</span> &raquo;{" "}
        <span>Allée et aménagement de jardin</span> &raquo;{" "}
        <strong>Aménagement extérieur d'une entrée à Riedisheim</strong>
      </nav>

      <h1>Aménagement extérieur d'une entrée à Riedisheim</h1>

      <div className="content">
        <div className="image-carousel">
          {/* Use a library like Swiper or a simple carousel */}
          <img
            src="your-image-path.jpg"
            alt="Exterior design"
            className="main-image"
          />
          <div className="thumbnail-images">
            <img src="your-image-path.jpg" alt="Thumbnail 1" />
            <img src="your-image-path.jpg" alt="Thumbnail 2" />
            <img src="your-image-path.jpg" alt="Thumbnail 3" />
          </div>
        </div>

        <div className="text-section">
          <h2>Besoin client</h2>
          <p>
            Ce couple de clients vivant dans une belle maison à Riedisheim ont
            sollicité le courtier de leur secteur pour faire{" "}
            <strong>réaménager leur entrée extérieure</strong>. Parmi leurs
            besoins, une des contraintes était de conserver leur portillon en
            fer forgé et de l'intégrer à la nouvelle{" "}
            <strong>réalisation de clôture</strong>.
          </p>

          <h2>Projet</h2>
          <ul>
            <li>Faciliter l’accès à la maison</li>
            <li>Mettre en place un éclairage extérieur moderne et efficace</li>
            <li>
              Rendre l'entrée à la maison plus esthétique grâce à des parterres
              fleuris aménagés
            </li>
          </ul>

          <h2>Les plus</h2>
          <p>
            En ayant fait appel à un courtier La Maison Des Travaux, les clients
            bénéficient maintenant d'une entrée agréable, moderne et à leur
            image.
          </p>

          <div className="buttons">
            <button className="btn btn-primary">Demander un devis gratuit</button>
            <button className="btn btn-secondary">
              Découvrir les réalisations de l'agence de Mulhouse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExternalEntryPage;
