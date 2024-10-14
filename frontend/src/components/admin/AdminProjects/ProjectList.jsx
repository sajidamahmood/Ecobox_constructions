import React from 'react';
import './ProjectList.scss'; // Optional: for styling

const ProjectList = ({ projects, onEdit, onDelete }) => {
  return (
    <div className="project-list">
      <h2>Existing Projects</h2>
      {projects.length === 0 ? (
        <p>No projects available.</p>
      ) : (
        <ul className="list-group">
          {projects.map((project) => (
            <li key={project.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{project.title}</span>
              <div>
                <button className="btn btn-secondary mr-2" onClick={() => onEdit(project)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => onDelete(project.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectList;
