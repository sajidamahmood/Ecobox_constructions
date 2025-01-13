import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css';


const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert('Logged out');
    localStorage.removeItem('auth_token'); // Clear the auth token or other logout logic
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    navigate('/login'); // Redirect to login page
  };

  return (
    <button className="logout-btn " onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
