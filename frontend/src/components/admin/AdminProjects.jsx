import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axios';
import ProjectForm from './ProjectForm';
import './AdminServices.css';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);

  const handleFormSubmit = async (formData) => {
    try {
      if (editingProject) {
        console.log("Updating project:", formData);
        const updatedProject = await axiosInstance.post(
          `/projects/update/${editingProject.id}`,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        );
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project.id === updatedProject.data.id
              ? updatedProject.data
              : project
          )
        );
        setMessage('Project updated successfully!');
        setEditingProject(null);
      } else {
        const newProject = await axiosInstance.post('/projects', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setProjects((prevProjects) => [...prevProjects, newProject.data]);
        setMessage('Project added successfully!');
      }
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/projects/${id}`);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== id)
      );
      setMessage('Project deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleEdit = (project) => {
    console.log("Editing project:", project);
    setEditingProject(project);
  };

  return (
    <div>
      <h1>Manage Projects</h1>

      {message && <div className="alert alert-success">{message}</div>}

      <ProjectForm
        key={editingProject ? editingProject.id : 'new'}
        initialData={editingProject || {}}
        onSubmit={handleFormSubmit}
      />

      <h2>Existing Projects</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="list-group">
          {projects.length > 0 ? (
            projects.map((project) => (
              <li key={project.id} className="list-group-item">
                <div>
                  <strong>ID:</strong> {project.id}
                </div>
                <div>
                  <strong>Name:</strong>
                  <div>{project.name}</div>
                </div>
                <div className="description">
                  <strong>Description:</strong>
                  <div>{project.description}</div>
                </div>
                <div>
                  <strong>Image:</strong>
                  {project.image ? (
                    <img
                      src={`${axiosInstance.defaults.baseURL.replace('/api', '')}${project.image}`}
                      alt={project.Name}
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
                    onClick={() => handleEdit(project)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn delete-btn"
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li>No projects available</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default AdminProjects;
