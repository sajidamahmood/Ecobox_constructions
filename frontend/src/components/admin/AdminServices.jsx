import React, { useState, useEffect } from 'react';
import axios from'axios';
import axiosInstance from '../../api/axios';
import ServiceForm from './ServiceForm';
import './AdminServices.css';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
const response = await axiosInstance.get('/services'); 
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
      setLoading(false);
    };
    fetchServices();
  }, []);

  const handleFormSubmit = async (formData) => {
    try {
      if (editingService) {
        console.log("Updating service:", formData);
        const updatedService = await axiosInstance.post(
          `/services/update/${editingService.id}`,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        );
        setServices((prevServices) =>
          prevServices.map((service) =>
            service.id === updatedService.data.id
              ? updatedService.data
              : service
          )
        );
        setMessage('Record updated successfully!');
        setEditingService(null);
      } else {
        const newService = await axiosInstance.post('/services', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setServices((prevServices) => [...prevServices, newService.data]);
        setMessage('Record added successfully!');
      }
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleDelete = async (id) => {
    console.log('Deleting service with ID:', id);

    try {
      await axiosInstance.delete(`/services/${id}`);
      setServices((prevServices) =>
        prevServices.filter((service) => service.id !== id)
      );
      setMessage('Record deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const handleEdit = (service) => {
    console.log("Editing service:", service);
    setEditingService(service);
  };






  return (
    <div>
      <h1>Manage Services</h1>

      {message && <div className="alert alert-success">{message}</div>}

      <ServiceForm
        key={editingService ? editingService.id : 'new'}
        initialData={editingService || {}}
        onSubmit={handleFormSubmit}
      />

      <h2>Existing Services</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="list-group">
          {services.length > 0 ? (
            services.map((service) => (
              <li key={service.id} className="list-group-item">
                <div>
                <strong>ID:</strong> {service.id}
                </div>
                <div>
                  <strong>Title:</strong>
                  <div>{service.title}</div>
                </div>
                <div className="description">
                  <strong>Description:</strong>
                  <div>{service.description}</div>
                </div>
                <div>
                 <strong>Image:</strong>
             {service.image ? (
            <img
          src={`${axios.defaults.baseURL.replace('/api', '')}${service.image}`}
        alt={service.name}
        onError={(e) => {
         e.target.src = 'https://via.placeholder.com/150'; 
          }}
          />
          ) : (
          <div>No image available</div>
            )}
          </div>

          <div className="action-buttons">
  <button
    className="btn edit-btn m-2"
    onClick={() => handleEdit(service)}
  >
    Edit
  </button>
  <button
    className="btn delete-btn"
    onClick={() => handleDelete(service.id)}
  >
    Delete
  </button>
</div>

              </li>
            ))
          ) : (
            <li>No services available</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default AdminServices;
