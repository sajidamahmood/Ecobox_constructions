import React, { useState } from "react";
import HeaderNavigation from '../common/HeaderNavigation';
import FooterBanner from '../common/FooterBanner';
import Hero from '../common/Hero';
import { useNavigate, Link } from "react-router-dom";
import axiosInstance, { setAuthHeader } from "../../api/axios";

import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); 

  const navigate = useNavigate();

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    try {
      /*await axios.get('https://ecobox-constructions.onrender.com/sanctum/csrf-cookie', {
        withCredentials: true,
      });*/
  
      /*const response = await axiosInstance.post('/login', { email, password }, { withCredentials: true });
      console.log('Login Response:', response.data);*/

      const response = await axiosInstance.post('http://127.0.0.1:8000/api/login', { email, password }, { withCredentials: true });
      console.log('Login Response:', response.data);

      const { token, user } = response.data;

      // Store user data in localStorage
      localStorage.setItem('auth_token', token);
      localStorage.setItem('role', user.role);
      localStorage.setItem('username', user.name);

      setAuthHeader(token);

      const currentPath = window.location.pathname;
      if (currentPath === "/" || currentPath === "/login") {
        navigate("/"); // Stay on home page
      } else {
        if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user-dashboard");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);

      if (error.response) {
        setError(error.response.data.message || 'An error occurred, please try again.');
      } else if (error.request) {
        setError('No response from server. Please check your connection.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <>
      <HeaderNavigation />
      <main>
        <Hero 
          
        />

        <div className="login-container">
          <h2>Se connecter</h2>
          {error && <p className="error-text">{error}</p>}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Entrez votre email"
                required
              />
            </div>
            <div className="form-group position-relative">
      <label htmlFor="password">Mot de passe</label>
      <div className="input-group">
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder=" Entrez votre mot de passe"
          className="form-control"
          required
        />
        <span
          className="position-absolute end-0 top-50 translate-middle-y me-2"
          onClick={() => setShowPassword(!showPassword)}
          style={{ cursor: 'pointer' }}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      
    </div>
            <button type="submit" className="login">
            Se connecter
            </button>
          </form>
          <div className="register-prompt">
            <p>
            Vous n'avez pas de compte ? <Link to="/register" className="register-link"> Inscrivez-vous ici</Link>
            </p>
          </div>
          
        </div>
      </main>
      <FooterBanner />
    </>
  );
};

export default Login;
