import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

const ProjectDetail = () => {
  const [projects, setProjects] = useState([]); // Array to hold all projects
  const [error, setError] = useState(null);
  const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:8000';

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response1 = await axios.get(`${baseUrl}/api/projects/1`);
        const response2 = await axios.get(`${baseUrl}/api/projects/3`);
        const response3 = await axios.get(`${baseUrl}/api/projects/5`);

        setProjects([response1.data, response2.data, response3.data]);
      } catch (err) {
        setError('Error fetching projects');
        console.error('Error fetching projects:', err);
      }
    };

    fetchProjects();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (projects.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <main>
        <section className='section-3 py-5'>
          <div className='container py-5'>
            <h2 className='title'>Nos projets récents</h2>
            <div className='row pt-20'>
              {projects.map((project) => (
                <div key={project.id} className="col-md-4">
                  <div class="project-cards-container">
                <div class="project-card">
                  <div class="project-image">
                    <img
                      src={project.image}
                      alt={project.name}
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                    />
                  </div>
                  <div class="project-overlay">                    <div className="project-name">
                      <h3>{project.name}</h3>
                    </div>
                    <Link
  to={
    project.id === 1
      ? "/Allprojects"
      : project.id === 3
      ? "/Allprojects"
      : project.id === 5
      ? "/Allprojects"
      : `/project/${project.id}`
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

export default ProjectDetail;
