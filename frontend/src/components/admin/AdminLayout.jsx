import React from 'react';
import { Link, Outlet } from 'react-router-dom'; 
import "./AdminLayout.scss";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li><Link to="/admin/services">Our Services</Link></li>
          <li><Link to="/admin/projects">Our Projects</Link></li>
          <li><Link to="/admin/testimonials">Our Testimonials</Link></li>
          <li><Link to="/admin/members">Our Members</Link></li>
          <li><Link to="/logout">Logout</Link></li> {/* Adjust logout functionality as needed */}
        </ul>
      </div>
      <div className="admin-content">
        <Outlet /> {/* This will render the nested routes */}
        <Link to="/logout" onClick={() => {
  // Handle logout functionality
         alert('Logged out');
         }}>Logout</Link>

      </div>
    </div>
  );
};

export default AdminLayout;
