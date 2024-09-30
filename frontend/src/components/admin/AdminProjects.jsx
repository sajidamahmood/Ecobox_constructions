import React, { useState, useEffect } from 'react';
import ServiceForm from './common/ServiceForm'; // Reusable form for project creation/editing

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null); // Project being edited
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To capture errors

  // Fetch all projects from API when the component is mounted
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/projects');
      if (!response.ok) throw new Error('Failed to fetch projects');
      const data = await response.json();
      setProjects(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingProject) {
        // Update existing project (PUT request)
        const response = await fetch(`http://127.0.0.1:8000/api/projects/${editingProject.id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error('Failed to update project');
        const updatedProject = await response.json();
        
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project.id === editingProject.id ? updatedProject : project
          )
        );
        setEditingProject(null);
      } else {
        // Create new project (POST request)
        const response = await fetch('http://127.0.0.1:8000/api/projects', {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error('Failed to create project');
        const newProject = await response.json();
        setProjects((prevProjects) => [...prevProjects, newProject]);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/projects/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete project');
      setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
  };

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Manage Projects</h1>
      <ServiceForm
        initialData={editingProject || {}} // Pass existing project for editing or empty form for new
        onSubmit={handleFormSubmit}
        onCancel={handleCancelEdit} // Allow canceling the edit
      />

      <h2>Existing Projects</h2>
      <ul className="list-group">
        {projects.map((project) => (
          <li key={project.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{project.name} (Slug: {project.slug})</span>
            <div>
              <button className="btn btn-secondary mr-2" onClick={() => handleEdit(project)}>
                Edit
              </button>
              <button className="btn btn-danger" onClick={() => handleDelete(project.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProjects;
