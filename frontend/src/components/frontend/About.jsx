import React, { useEffect, useState } from "react";
import axios from "axios";
import AboutImg from '../../assets/images/we.jpg'
import Header from '../common/Header';
import Hero from '../common/Hero';
 

const About = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:8000'; // Adjust according to your setup

  // Fetch team members from the API
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/members")
      .then(response => {
        console.log(response.data); // Check what data is being returned
        setTeamMembers(response.data);
      })
      .catch(error => {
        console.error("Error fetching the team members:", error.message);
      });
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero 
          preHeading="Quality. Integrity. Value" 
          heading="About Us" 
          text="We offer diverse construction services, spanning residential,<br/> commercial, and industrial projects."
        />

        <section className='section-2 py-5'>
          <div className='container py-5'>
            <div className='row'>
              <div className='col-md-6'>
                <img src={AboutImg} className='w-100' alt="About" />
              </div>
              <div className='col-md-6'>
                <span>About us</span>
                <h2>Crafting structure that last a lifetime</h2>
                <p>"At Ecobox Energy Constructions, we are dedicated to crafting sustainable and innovative spaces that not only stand the test of time but also inspire a harmonious blend of nature and modern living."</p>
                <p>Our commitment to quality, integrity, and excellence drives us to transform visions into reality, ensuring every project we undertake reflects our passion for craftsmanship and our unwavering dedication to client satisfactionLorem ipsum dolor sit amet consectetur adipisicing elit. Tempora exercitationem id commodi aliquam sunt, asperiores ab cumque doloremque perspiciatis eaque fugiat quo. Modi similique eaque officia cum! Vel, id corrupti.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className='section-8 bg-light py-5'>
          <div className='container py-5'>
            <div className='section-header text-center'>
              <span>Team</span>
              <h2>Our Team</h2>
              <p>We offer diverse construction services, spanning residential, commercial, and industrial projects.</p>
            </div>

            <div className="row pt-5">
              {teamMembers.map(member => (
                <div key={member.id} className="col-md-4 text-center">
                  <div className="team-member">
  
                  <img
                  src={`${baseUrl}${member.image_url}`}
                  alt={member.name}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }} // Placeholder image
                  class="img-fluid rounded-circle mb-3" width="400" />
                    <h4>{member.name}</h4>
                    <p className="text-muted">{member.description}</p>
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

export default About;
