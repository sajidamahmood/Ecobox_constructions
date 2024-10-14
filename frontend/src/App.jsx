import React from 'react'; 
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.scss';
import Home from './components/frontend/Home';
import About from './components/frontend/About';
import Projects from './components/frontend/Projects';
import ContactUs from './components/frontend/ContactUs';
import Services from './components/frontend/Services';
import Reservation from './components/frontend/Services';

import Login from './components/auth/Login'; 
import Register from './components/auth/Register'; 
import AdminDashboard from './components/admin/AdminDashboard'; 
import AdminLayout from './components/admin/AdminLayout';
import AdminProjects from './components/admin/AdminProjects/AdminProjects';
import AdminTestimonials from './components/admin/AdminTestimonials/AdminTestimonials';
import AdminMembers from './components/admin/AdminMembers/AdminMembers';
import AdminServices from './components/admin/AdminServices/AdminServices';


function App() {
  // State to track if the admin is logged in
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock login function for testing
  const login = () => {
    setIsAuthenticated(true);
  };

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/services' element={<Services />} />
        <Route path='/Reservation' element={<ContactUs />} />
        
        <Route path='/login' element={<Login onLogin={login} />} />
        <Route path='/register' element={<Register />} />

        {/* Admin Routes */}
        <Route path='/admin' element={<AdminLayout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Navigate to='/admin/dashboard' />
              </ProtectedRoute>
            }
          />
          <Route
            path='dashboard'
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path='Services'
            element={
              <ProtectedRoute>
                <AdminServices />
              </ProtectedRoute>
            }
          />
          <Route
            path='projects'
            element={
              <ProtectedRoute>
                <AdminProjects />
              </ProtectedRoute>
            }
          />
          <Route
            path='testimonials'
            element={
              <ProtectedRoute>
                <AdminTestimonials />
              </ProtectedRoute>
            }
          />
          <Route
            path='members'
            element={
              <ProtectedRoute>
                <AdminMembers />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
