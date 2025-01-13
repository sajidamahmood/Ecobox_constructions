import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FooterBanner from '../common/FooterBanner';
import UpperBar from '../common/UpperBar'; 
import HeaderNavigation from '../common/HeaderNavigation'
import './Members.css';

const Members = () => {
  const [members, setMembers] = useState([]);
  const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:8000'; // Adjust according to your setup

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/members`); // Assuming this endpoint exists for fetching members
        console.log(response.data); // Check the fetched data
        setMembers(response.data);
      } catch (error) {
        console.error('Error fetching members:', error.message);
      }
    };

    // Fetch the members when the component mounts
    fetchMembers();
  }, []);

  return (
    <>
     <UpperBar/>
     <HeaderNavigation />
      <main>
        <section className='section-3 bg-light py-5'>
          <div className='container py-5'>
            <h2 className='title'>Notre équipe</h2>

            <div className='row pt-20'>
              {members.length > 0 ? (
                members.map(member => (
                  <div key={member.id} className='col-md-4 col-lg-4 pt-4'>
                    <div className="member-cards-container">
                      <div className="member-card">
                      <div className="member-image">
                        <img
                          src={`${baseUrl}${member.image_url}`}
                          alt={member.name}
                          onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }} // Placeholder image
                        />
                      </div>
                      <div className="member-overlay">
                      <div className="member-name">
                      <h3>{member.name}</h3>
                      </div>
                    </div>
                    </div>
                    </div>

                  </div>
                ))
              ) : (
                <div className='col-12 text-center'>
                  <p>No team members available at the moment.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <FooterBanner/>

    </>
  );
};
export default Members;
