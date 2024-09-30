import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import axios for API calls
import ServiceForm from './common/ServiceForm'; 

const API_URL = 'http://127.0.0.1:8000/api/services';  // Base API URL for services

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);

  // Fetch all services from the API on component mount
  useEffect(() => {
    axios.get(API_URL)
      .then(response => setServices(response.data))
      .catch(error => console.error('Error fetching services:', error));
  }, []);

  // Handle form submission for creating/updating a service
  const handleFormSubmit = (formData) => {
    if (editingService) {
      // Update existing service
      axios.put(`${API_URL}/${editingService.id}`, formData)
        .then(response => {
          const updatedServices = services.map(service =>
            service.id === editingService.id ? response.data : service
          );
          setServices(updatedServices);
          setEditingService(null); // Reset form after editing
        })
        .catch(error => console.error('Error updating service:', error));
    } else {
      // Create new service
      axios.post(API_URL, formData)
        .then(response => {
          setServices([...services, response.data]);
        })
        .catch(error => console.error('Error creating service:', error));
    }
  };

  // Handle delete service
  const handleDelete = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setServices(services.filter(service => service.id !== id));
      })
      .catch(error => console.error('Error deleting service:', error));
  };

  // Handle edit service
  const handleEdit = (service) => {
    setEditingService(service); // Load the selected service into the form
  };

  return (
    <div>
      <h1>Manage Services</h1>

      {/* Form for adding/updating a service */}
      <ServiceForm initialData={editingService || {}} onSubmit={handleFormSubmit} />

      {/* List of existing services */}
      <h2>Existing Services</h2>
      <ul className="list-group">
        {services.map(service => (
          <li key={service.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{service.title} (Slug: {service.slug})</span>
            <div>
              <button className="btn btn-secondary mr-2" onClick={() => handleEdit(service)}>Edit</button>
              <button className="btn btn-danger" onClick={() => handleDelete(service.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminServices;
