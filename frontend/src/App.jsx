import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.scss';
import Home from './components/frontend/Home';
import About from './components/frontend/About';
import Projects from './components/frontend/Projects';
import ContactUs from './components/frontend/ContactUs';
import Services from './components/frontend/Services';
import Login from './components/auth/Login'; 
import Register from './components/auth/Register'; 
import AdminDashboard from './components/admin/AdminDashboard';
import AdminLayout from './components/admin/AdminLayout';
import AdminServices from './components/admin/AdminServices';
import AdminProjects from './components/admin/AdminProjects';
import AdminTestimonials from './components/admin/AdminTestimonials';
import AdminMembers from './components/admin/AdminMembers';

function App() {
  // State to track if the admin is logged in
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock login function for testing
  const login = () => {
    // In a real app, you'd check credentials and set the authentication state
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
            path='services'
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
