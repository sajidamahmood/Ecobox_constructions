import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css';

import Home from './components/frontend/Home';
import About from './components/frontend/About';
import Projects from './components/frontend/Projects';
import Members from './components/frontend/Members';

import ContactUs from './components/frontend/ContactUs';
import Services from './components/frontend/Services';
import ExternalEntryPage from './components/frontend/ExternalEntryPage';
import Extension from './components/frontend/Extension'; 
import InteriorRenovation from './components/frontend/InteriorRenovation'; 
import ExteriorWorks from './components/frontend/ExteriorWorks'; 
import WhoweAre from './components/frontend/WhoweAre'; 
import Allprojects from'./components/frontend/Allprojects';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';

import AdminDashboard from './components/admin/AdminDashboard';
import AdminLayout from './components/admin/AdminLayout';
import AdminServices from './components/admin/AdminServices';
import AdminProjects from './components/admin/AdminProjects';
import AdminMembers from './components/admin/AdminMembers';
import UserDashboard from './components/user/UserDashboard'; 

// ProtectedRoute component
const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('auth_token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null); // Keep track of user role

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userRole = localStorage.getItem('role');
    if (token && userRole) {
      setIsAuthenticated(true);
      setRole(userRole);

      
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Frontend Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/Allprojects" element={<Allprojects />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/Members" element={<Members />} />

        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/external-entry" element={<ExternalEntryPage />} />
        <Route path="/extension" element={<Extension/>} /> 
        <Route path="/interior-renovation" element={<InteriorRenovation/>} /> 
        <Route path="/exterior-works" element={<ExteriorWorks/>} /> 
        <Route path="/who-we-are" element={<WhoweAre/>} /> 


        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password"element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />



        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route
            index
            element={<Navigate to="/admin/dashboard" />}
          />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="services"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminServices />
              </ProtectedRoute>
            }
          />
          <Route
            path="projects"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminProjects />
              </ProtectedRoute>
            }
          />
          <Route
            path="members"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminMembers />
              </ProtectedRoute>
            }
          />
        </Route>
        

        {/* User Routes */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute requiredRole="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
