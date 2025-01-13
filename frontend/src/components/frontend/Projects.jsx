import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Projects = () => {

  

  const [projects, setProjects] = useState([]);
  const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:8000'; // Adjust according to your setup


  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/projects');
        console.log(response.data); // Check the fetched data
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error.message);
      }
    };

    // Fetch the projects when the component mounts
    fetchProjects();
  }, []);
  

  return (
    <>
    <main>
        
        <section className='section-3 bg-light py-5'>
          <div className='container py-5'>
          <h2 className='title'>Nos Projet d’intervention</h2>

            <div className='row pt-20'>
              {projects.length > 0 ? (
                projects.map(project => (
                  <div key={project.id} className='col-md-4 col-lg-4 pt-4'>
                  <div className='service-card'>
                  <div className='service-image'>
                  <img
                  src={`${baseUrl}${project.image}`}
                     alt={project.name}
                       onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }} // Placeholder image
                  />
                </div>
            <div className='service-body'>
         <div className='service-title'>
        <h3>{project.name}</h3>
      </div>
      <div className='service-content'>
        <p>{projects.description}</p>
      </div>
    </div>
  </div>
</div>
                ))
              ) : (
                <div className='col-12 text-center'>
                  <p>No projects available at the moment.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
    </>
  );
};


export default Projects;
