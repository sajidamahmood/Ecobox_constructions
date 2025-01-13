import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Services.css';



const ServicesComponent = () => {
  const [services, setServices] = useState([]);
  const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:8000'; 

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/services'); 
        console.log(response.data); // Check the fetched data

        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <>
      <main>
        <section className='section-3  py-5'>
          <div className='container py-5'>
          <h2 className='title'>Nos domaines d’intervention</h2>
            <div className='row pt-20'>
              {services.length > 0 ? (
                services.map(service => (
                  <div key={service.id} className='col-md-4 col-lg-4 pt-4'>
                    <div class="service-cards-container">

                  <div class='service-card'>
                  <div class='service-image'>
                  <img
                  src={`${baseUrl}${service.image}`}
                     alt={service.name}
                       onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }} // Placeholder image
                  />
                </div>
                <div class="service-overlay">
                <div className='service-title'>
        <h3>{service.title}</h3>
      </div>
    </div>
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
    </>
  );
};

export default ServicesComponent;
