import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axios';
import axios from 'axios';

import { Link } from 'react-router-dom'; 

import './ServiceDetails.css';

const ServiceDetail = () => {
  const [services, setServices] = useState([]); // Array to hold all services
  const [error, setError] = useState(null);

  const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:8000';

  /*const baseUrl ='https://ecobox-constructions.onrender.com/api';*/

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response1 = await axiosInstance.get(`${baseUrl}/api/services/1`);
        const response2 = await axios.get(`${baseUrl}/api/services/2`);
        const response3 = await axios.get(`${baseUrl}/api/services/8`);
        
        setServices([response1.data, response2.data, response3.data]);
      } catch (err) {
        setError('Error fetching services');
        console.error('Error fetching services:', err);
      }
    };

    fetchServices();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (services.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <main>
        <section className='section-3 py-5'>
          <div className='container py-5'>
            <h2 className='title'>Nos domaines d’intervention</h2>
            <div className='row pt-20'>
              {services.map((service) => (
                <div key={service.id} className='col-md-4'>
                  <div class="service-cards-container">
                  <div class='service-card'>
                    <div class='service-image'>
                      <img
                        src={service.image}
                        alt={service.title}
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }} // Placeholder image
                      />
                    </div>
                    <div class='service-overlay'>
                      <div class='service-title'>
                        <h3>{service.title}</h3>
                      </div>
                      <Link
                        to={
                          service.id === 1
                            ? "/interior-renovation"
                            : service.id === 2
                            ? "/exterior-works"
                            : service.id === 3
                            ? "/extension"
                            : `/service/${service.id}`
                        }
                      >
                        <button class="read-more-button">See More</button>
                      </Link>
                    </div>
                  </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </section>
      </main>
    </>
  );
};

export default ServiceDetail;
