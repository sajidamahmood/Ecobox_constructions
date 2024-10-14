import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Hero from '../common/Hero';

const ServicesComponent = () => {
  const [services, setServices] = useState([]);
console.log(services)
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/services'); 
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero 
          preHeading="Quality. Integrity. Value" 
          heading="Our Services" 
          text="We offer diverse construction services, spanning residential, <br/> commercial, and industrial projects."
        />
        <section className='section-3 bg-light py-5'>
          <div className='container py-5'>
            <div className='section-header text-center'>
              <span>Our Services</span>
              <h2>Our construction services</h2>
              <p>We offer a diverse range of construction services, spanning residential, commercial, and industrial projects.</p>
            </div>
            <div className='row pt-20'>
              {services.length > 0 ? (
                services.map(service => (
                  <div key={service.id} className='col-md-4 col-lg-4 pt-4'>
                    <div className='items'>
                      <div className='service-image'>
                       
                      <img src={`http://127.0.0.1:8000/storage/services_images/${service.image || 'default.jpg'}`} 
                    className='w-100' 
                          alt={service.title} 
                        />
                      </div>
                      <div className='service-body'>
                        <div className='service-title'>
                          <h3>{service.title}</h3>
                        </div>
                        <div className='service-content'>
                          <p>{service.description}</p>
                        </div>
                        <a href="#" className='btn btn-primary'>Read More</a>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className='col-12 text-center'>
                  <p>No services available at the moment.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ServicesComponent;
