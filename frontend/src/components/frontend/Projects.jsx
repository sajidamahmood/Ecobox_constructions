import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Hero from '../common/Hero';

const Projects = () => {
  const [projects, setProjects] = useState([]);

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
      <Header />
      <main>
        <Hero 
          preHeading="Innovative. Reliable. Sustainable." 
          heading="Our Projects" 
          text="We take pride in delivering high-quality construction projects <br/> that meet your needs and exceed your expectations."
        />
        <section className='section-3 bg-light py-5'>
          <div className='container py-5'>
            <div className='section-header text-center'>
              <span>Our Projects</span>
              <h2>Featured Construction Projects</h2>
              <p>Explore some of the most recent projects we’ve completed.</p>
            </div>
            <div className='row pt-5'>
  {projects.length > 0 ? ( // Check if there are projects available
    projects.map(project => (
      <div key={project.id} className='col-md-4 col-lg-4 mb-4'> {/* Added margin bottom for spacing */}
  <div className='items'>
  <div className='project-image' style={styles.projectImage}>
  <img 
        src={project.image ? `http://127.0.0.1:8000/storage/projects_images/${project.image}` : 'http://127.0.0.1:8000/storage/projects_images/default.jpg'} 
        alt={project.name} 
        className='img-fluid'  // Added Bootstrap's img-fluid class for responsive images
      />
    </div>
    <div className='project-body'>
      <div className='project-title'>
        <h3>{project.name}</h3>
      </div>
      <div className='project-content'>
        <p>{project.description}</p>
      </div>
      <a href="#" className='btn btn-primary'>Read More</a>
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
      <Footer />
    </>
  );
};
const styles = {
  projectImage: {
    overflow: 'hidden',
    borderRadius: '8px',
    height: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },
  projectImageImg: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
  items: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    transition: 'transform 0.3s',
  },
};

export default Projects;
