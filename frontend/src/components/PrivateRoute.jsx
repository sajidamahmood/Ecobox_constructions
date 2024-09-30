import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element }) => {
  const isAuthenticated = localStorage.getItem('authToken'); // Or use a global auth state
  return isAuthenticated ? <Element /> : <Navigate to="/login" />;
};

export default PrivateRoute;
