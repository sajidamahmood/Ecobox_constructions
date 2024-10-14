import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ServiceList.scss'; // Optional: for styling

const API_URL = 'http://127.0.0.1:8000/api/services'; // Base API URL for services

const ServiceList = ({ onEdit }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all services from the API on component mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(API_URL);
        setServices(response.data);
      } catch (err) {
        setError('Error fetching services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Handle delete service
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setServices(services.filter((service) => service.id !== id));
      } catch (err) {
        setError('Error deleting service');
      }
    }
  };

  if (loading) {
    return <p>Loading services...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Existing Services</h2>
      <ul className="list-group">
        {services.map((service) => (
          <li key={service.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{service.title} (Slug: {service.slug})</span>
            <div>
              <button className="btn btn-secondary mr-2" onClick={() => onEdit(service)}>
                Edit
              </button>
              <button className="btn btn-danger" onClick={() => handleDelete(service.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceList;
