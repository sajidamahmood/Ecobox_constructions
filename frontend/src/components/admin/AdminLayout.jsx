import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Logout from "../auth/Logout"; // Relative to the AdminLayout.jsx file
import './AdminLayout.scss'; 


const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <div className="sidebar">
        <h1>Admin Panel</h1>
        <ul>
        <li><Link to="/admin/Dashboard">Dashboard</Link></li>

          <li><Link to="/admin/services">Our Services</Link></li>
          <li><Link to="/admin/projects">Our Projects</Link></li>
        </ul>
        <div className="logout-container">
          <Logout /> {/* Logout button placed outside the list */}
        </div>
      </div>
      <div className="admin-content">
        <Outlet /> {/* This will render the nested routes */}
      </div>
    </div>
  );
};

export default AdminLayout;
