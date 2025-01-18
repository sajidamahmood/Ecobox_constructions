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
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const navigate = useNavigate();

  const handleLoginCallback = (data) => {
    console.log("User login callback:", data);
  };

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
      const response = await axiosInstance.post("http://127.0.0.1:8000/api/login", { email, password });
      const { token, user } = response.data;

      // Store user data in localStorage
      localStorage.setItem('auth_token', token);
      localStorage.setItem('role', user.role);
      localStorage.setItem('username', user.name);

      setAuthHeader(token);
      handleLoginCallback({ token, user });

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
          preHeading="Quality. Integrity. Value" 
          heading="Login Here" 
          text="We offer diverse construction services, spanning residential,<br/> commercial, and industrial projects." 
        />

        <div className="login-container">
          <h2>Login</h2>
          {error && <p className="error-text">{error}</p>}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group position-relative">
      <label htmlFor="password">Password</label>
      <div className="input-group">
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
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
      <div className="forgot-password-prompt">
            <p>
              Forgot your password? <Link to="/forgot-password">Reset it here</Link>

            </p>
          </div>
    </div>
            <button type="submit" className="login">
              Login
            </button>
          </form>
          <div className="register-prompt">
            <p>
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          </div>
          
        </div>
      </main>
      <FooterBanner />
    </>
  );
};

export default Login;
