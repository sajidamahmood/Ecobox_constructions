import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ServiceForm from './ServiceForm';
import './AdminServices.scss'; // Import SCSS for styling
import { Button, ListGroup, Modal } from 'react-bootstrap'; // Import Bootstrap components

const API_URL = 'http://127.0.0.1:8000/api/services';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [showForm, setShowForm] = useState(false); // State to toggle the form display

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(API_URL);
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingService) {
        const response = await axios.put(`${API_URL}/${editingService.id}`, formData);
        setServices(services.map(service => (service.id === editingService.id ? response.data : service)));
        setEditingService(null);
      } else {
        const response = await axios.post(API_URL, formData);
        setServices([...services, response.data]);
      }
      setShowForm(false); // Hide form after submit
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setServices(services.filter(service => service.id !== id));
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  const handleNewService = () => {
    setEditingService(null); // Clear any currently editing service
    setShowForm(true);       // Show the form to create a new service
  };

  return (
    <div className="admin-services">
      <h1>Manage Services</h1>
      
      {/* New Service Button */}
      <Button variant="primary" onClick={handleNewService} className="mb-3">
        New Service
      </Button>

      {/* Conditionally Render the Form */}
      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingService ? 'Edit Service' : 'Add New Service'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ServiceForm
            initialData={editingService || {}} 
            onSubmit={handleFormSubmit} 
          />
        </Modal.Body>
      </Modal>

      <ListGroup>
        {services.map(service => (
          <ListGroup.Item key={service.id} className="d-flex justify-content-between align-items-center">
            <div>
              <h5>{service.title}</h5>
              <p>{service.description}</p>
            </div>
            <div>
              <Button variant="warning" onClick={() => { setEditingService(service); setShowForm(true); }} className="me-2">Edit</Button>
              <Button variant="danger" onClick={() => handleDelete(service.id)}>Delete</Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default AdminServices;
