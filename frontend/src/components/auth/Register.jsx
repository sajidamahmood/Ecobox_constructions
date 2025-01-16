import React, { useState } from 'react';
import Header from '../common/Header';
import HeaderNavigation from '../common/HeaderNavigation';
import FooterBanner from '../common/FooterBanner';
import Hero from '../common/Hero';
import Axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Register = () => {
  const [formData, setFormData] = useState({
    role: 'user', 
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility


  // Handle input change and update state
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error before validation
    setSuccess(''); // Reset success message
  
    console.log('Form Data before Validation:', formData); // Debug form data before validation
  
    // Validation checks
    if (formData.name.length < 3) {
      setError('Username must be at least 3 characters long.');
      return;
    }
    
    if (!/^[a-zA-Z]+$/.test(formData.name)) {
      setError('Username must contain only letters.');
      return;
    }
    
    const password = formData.password;
  
    // Check password length and complexity
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError('Password must contain at least one uppercase letter.');
      return;
    }
    if (!/\d/.test(password)) {
      setError('Password must contain at least one number.');
      return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setError('Password must contain at least one special character.');
      return;
    }
  
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setError('Invalid email format.');
      return;
    }
  
    console.log('Form Data after Validation:', formData); // Debug form data after passing validation
  
    // Proceed with API request if all validations pass
    try {
      const response = await Axios.post('https://ecobox-constructions.onrender.com/api/register', formData);
      console.log('API Response:', response.data); // Debug successful API response
      setSuccess('Registration successful!');
      setError('');
    } catch (error) {
      console.log('API Error Response:', error.response?.data); // Debug API error response
      if (error.response && error.response.data.errors) {
        // Show specific validation errors from Laravel
        setError(Object.values(error.response.data.errors).join(' '));
      } else {
        setError('Registration failed. Please try again.');
      }
      setSuccess('');
    }
  };

  return (
    <>
      <HeaderNavigation />
      <main>
        <Hero 
          preHeading="Quality. Integrity. Value" 
          heading="Register Here" 
          text="We offer diverse construction services, spanning residential,<br/> commercial, and industrial projects." 
        />
        <div className="container mt-5">
          <div className="row justify-content-center mb-4">
            <div className="col-md-6">
              <div className="card shadow">
                <div className="card-body p-5">
                  <h3 className="text-center mb-4">Register</h3>

                  {error && <div className="alert alert-danger">{error}</div>}
                  {success && <div className="alert alert-success">{success}</div>}

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role</label>
                    <select
    id="role"
    value={formData.role}
    onChange={handleInputChange}
    className="form-control"
  >
    <option value="user">User</option>
    <option value="admin">Admin</option>
  </select>
                      <label htmlFor="name" className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3 position-relative">
  <label htmlFor="password" className="form-label">Password</label>
  <div className="input-group">
    <input
      type={showPassword ? 'text' : 'password'}
      className="form-control"
      id="password"
      placeholder="Enter password"
      value={formData.password}
      onChange={handleInputChange}
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

<div className="mb-3 position-relative">
  <label htmlFor="password_confirmation" className="form-label">Confirm Password</label>
  <div className="input-group">
    <input
      type={showPassword ? 'text' : 'password'}
      className="form-control"
      id="password_confirmation"
      placeholder="Confirm password"
      value={formData.password_confirmation}
      onChange={handleInputChange}
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

                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                  </form>

                  <div className="mt-3 text-center">
                    <p>Already have an account? <a href="/login">Login</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterBanner />
      </>
  );
};

export default Register;
