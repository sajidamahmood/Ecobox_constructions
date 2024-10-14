import React, { useState } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Hero from '../common/Hero';
import Axios from 'axios';

const Register = () => {
  // State to manage form input values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  // State to manage form submission feedback
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

    // Validation checks
    if (formData.name.length < 3) {
      setError('Username must be at least 3 characters long.');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setError('Invalid email format.');
      return;
    }

    // Proceed with API request if all validations pass
    try {
      // Make POST request to your Laravel register API
      const response = await Axios.post('https://ecobox-constructions.onrender.com/api/register', formData);
      setSuccess('Registration successful!');
      setError('');
    } catch (error) {
      setError('Registration failed. Please try again.');
      setSuccess('');
    }
  };

  return (
    <>
      <Header />
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
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password_confirmation" className="form-label">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password_confirmation"
                        placeholder="Confirm password"
                        value={formData.password_confirmation}
                        onChange={handleInputChange}
                      />
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
      <Footer />
    </>
  );
};

export default Register;
