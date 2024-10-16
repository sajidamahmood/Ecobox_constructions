import React, { useState } from "react";
import Header from '../common/Header';
import Footer from '../common/Footer';
import Hero from '../common/Hero';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error before validation

    // Validation checks
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    // Proceed with API request if all validations pass
    try {
      const response = await axios.post('https://ecobox-constructions.onrender.com/api/login', {
        email,
        password
      });

      const { token, user } = response.data;

      // Store the token in localStorage for authenticated requests
      localStorage.setItem('auth_token', token);

      // Optionally store user info
      onLogin(user);

      // Redirect to admin dashboard upon successful login
      navigate('/admin/dashboard');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('An error occurred, please try again.');
      }
    }
  };

  return (
    <>
      <Header />
      <main>
        <Hero 
          preHeading="Quality. Integrity. Value" 
          heading="Login Here" 
          text="We offer diverse construction services, spanning residential,<br/> commercial, and industrial projects." 
        />

        <div className="login-container">
          <h2>Admin Login</h2>
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
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;
