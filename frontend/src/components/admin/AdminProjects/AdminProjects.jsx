import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectForm from './ProjectForm'; // Create this component for the form
import './AdminProjects.scss'; // Import SCSS for styling
import { Button, ListGroup, Modal } from 'react-bootstrap'; // Import Bootstrap components

const API_URL = 'http://127.0.0.1:8000/api/projects';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [showForm, setShowForm] = useState(false); // State to toggle the form display

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(API_URL);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingProject) {
        const response = await axios.put(`${API_URL}/${editingProject.id}`, formData);
        setProjects(projects.map(project => (project.id === editingProject.id ? response.data : project)));
        setEditingProject(null);
      } else {
        const response = await axios.post(API_URL, formData);
        setProjects([...projects, response.data]);
      }
      setShowForm(false); // Hide form after submit
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setProjects(projects.filter(project => project.id !== id));
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleNewProject = () => {
    setEditingProject(null); // Clear any currently editing project
    setShowForm(true);       // Show the form to create a new project
  };

  return (
    <div className="admin-projects">
      <h1>Manage Projects</h1>
      
      {/* New Project Button */}
      <Button variant="primary" onClick={handleNewProject} className="mb-3">
        New Project
      </Button>

      {/* Conditionally Render the Form */}
      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingProject ? 'Edit Project' : 'Add New Project'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProjectForm
            initialData={editingProject || {}} 
            onSubmit={handleFormSubmit} 
          />
        </Modal.Body>
      </Modal>

      <ListGroup>
        {projects.map(project => (
          <ListGroup.Item key={project.id} className="d-flex justify-content-between align-items-center">
            <div>
              <h5>{project.name}</h5>
              <p>{project.description}</p>
              <p><strong>Start Date:</strong> {project.start_date}</p>
              <p><strong>End Date:</strong> {project.end_date}</p>
              {project.image && <img src={project.image} alt={project.name} style={{ width: '100px' }} />}
            </div>
            <div>
              <Button variant="warning" onClick={() => { setEditingProject(project); setShowForm(true); }} className="me-2">Edit</Button>
              <Button variant="danger" onClick={() => handleDelete(project.id)}>Delete</Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default AdminProjects;
