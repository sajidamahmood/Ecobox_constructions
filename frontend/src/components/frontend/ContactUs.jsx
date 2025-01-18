import React from 'react';
import HeaderNavigation from '../common/HeaderNavigation'
import UpperBar from '../common/UpperBar'; 
import  FooterBanner from '../common/FooterBanner';
import Hero from '../common/Hero';
import contactImage from '../../assets/images/contact.jpg';  
import QuoteForm from '../common/QuoteForm';

const ContactUs = () => {
  return (
    <>
       <UpperBar/>
       <HeaderNavigation />
      <main>
        <Hero
          preHeading="Quality. Integrity. Value"
          heading="Contact Us"
          text="We offer diverse construction services, spanning residential,<br/> commercial, and industrial projects."
        />

        <section className="section-9 py-5">
          
          <div className="container">
            <div className="section-header text-center">
              
              <h2>Une question à nous poser ? Des travaux à réaliser ? Vous souhaitez un devis ?</h2>
              <p>
              Laissez nous un message, nous vous contacterons rapidement. Devis gratuit et sans engagement.
              </p>
            </div>
            <div className="row mt-5">
             
              <div className="col-md-6">
                <div className="card-body p-20 w-[70%]">
                <h3>Contactez-Nous</h3>
                    <div>
                    <QuoteForm />
                    </div>

                  </div>
              </div>
              <div className="col-md-6 contact">
  <div className="contact-card shadow border-0">
    <div className="card-body p-5">
      <div className="contact-image">
        <img
        src={contactImage}  
        alt="Contact Us"
        className="img-fluid "
        />
      </div>

      <aside className="contact-info mt-4">
        <h3>Les engagements</h3>
        <ul>
          <li><strong>Devis Gratuit:</strong> Obtenez des devis gratuitement.</li>
          <li><strong>Réponse sous 24h:</strong> Nous répondons sous 24h.</li>
          <li><strong>Meilleur rapport qualité/prix:</strong> Optimisé.</li>
          <li><strong>Artisans de qualité:</strong> Respect des normes.</li>
          <li><strong>Dans toute la France:</strong> Forte présence locale.</li>
        </ul>
      </aside>
    </div>
    <div className="card-body p-5">
      <h3>Call Us</h3>
      <div>
        <i className="fas fa-phone-alt"></i> (888-000-0000)
      </div>
      <div>
        <a href="#">(222-123-12345)</a>
      </div>
      <h3>You can write us</h3>
      <div>
        <a href="#">example@example.com</a>
      </div>
      <div><a href="#">infoe@example.com</a></div>
      <h3>Address</h3>
      <div>8 rue de la xxxxxx <br /> Clermont Ferrand <br />France</div>
      <div className='mt-4'>
        <iframe
          title="location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2530.6172689164036!2d3.0806788157371517!3d45.78328507910681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f71c2a553adeff%3A0x7f892a30515a79f7!2s8%20Rue%20de%20la%20xxxxxx%2C%2063000%20Clermont-Ferrand%2C%20France!5e0!3m2!1sen!2sfr!4v1632123456789!5m2!1sen!2sfr"
          width="100%"
          height="200"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  </div>
</div>

            </div>
          </div>
        </section>
      </main>
      <FooterBanner />
      </>
  );
};

export default ContactUs;
