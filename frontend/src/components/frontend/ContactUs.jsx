import Header from '../common/Header';
import Footer from '../common/Footer';
import Hero from '../common/Hero';
import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "", // Included subject field
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let errors = {};

    // Name validation: only characters
    if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      errors.name = "Name must only contain letters";
    }

    // Email validation: standard email regex
    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    // Phone number validation: Only digits, must be exactly 10 digits
    if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone number must be 10 digits";
    }

    // Message validation: can't be empty
    if (formData.message.trim() === "") {
      errors.message = "Message cannot be empty";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // Submit form logic here
      console.log("Form submitted", formData);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Header />
      <main>
        <Hero
          preHeading="Quality. Integrity. Value"
          heading="Contact Us"
          text="We offer diverse construction services, spanning residential,<br/> commercial, and industrial projects."
        />

        <section className='section-9 py-5'>
          <div className='container'>
            <div className='section-header text-center'>
              <h2>Contact Us</h2>
              <p>Our dedicated experts are here to help you with any of your questions, contact us by <br /> filling out the form below and we will be in touch shortly</p>
            </div>
            <div className='row mt-5'>
              <div className='col-md-3'>
                <div className='card shadow border-0 mb-3'>
                  <div className='card-body p-4'>
                    <h3>Call Us</h3>
                    <div><a href="#">(888-000-0000)</a></div>
                    <div><a href="#">(222-123-12345)</a></div>
                    <h3>You can write us</h3>
                    <div><a href="#">example@example.com</a></div>
                    <div><a href="#">infoe@example.com</a></div>
                    <h3>Address</h3>
                    <div>8 rue de la xxxxxx <br /> Clermont Ferrand <br />France</div>
                    <div className='mt-4'>
                      <iframe
                        title="location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2530.6172689164036!2d3.0806788157371517!3d45.78328507910681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f71c2a553adeff%3A0x7f892a30515a79f7!2s8%20Rue%20de%20la%20xxxxxx%2C%2063000%20Clermont-Ferrand%2C%20France!5e0!3m2!1sen!2sfr!4v1632123456789!5m2!1sen!2sfr"
                        width="100%"
                        height="200"
                        frameBorder="0"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-md-9'>
                <div className='card shadow border-0'>
                  <div className='card-body p-5'>
                    <form onSubmit={handleSubmit}>
                      <div className='row'>
                        <div className='col-md-6 mb-4'>
                          <label htmlFor="name" className='form-label'>Name</label>
                          <input
                            type="text"
                            name="name"
                            className='form-control form-control-lg'
                            placeholder='Enter Name'
                            value={formData.name}
                            onChange={handleChange}
                          />
                          {errors.name && <small className="text-danger">{errors.name}</small>}
                        </div>
                        <div className='col-md-6 mb-4'>
                          <label htmlFor="email" className='form-label'>Email</label>
                          <input
                            type="email" // Changed to type="email"
                            name="email"
                            className='form-control form-control-lg'
                            placeholder='Enter Email'
                            value={formData.email}
                            onChange={handleChange}
                          />
                          {errors.email && <small className="text-danger">{errors.email}</small>}
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-md-6 mb-4'>
                          <label htmlFor="phone" className='form-label'>Phone Number</label>
                          <input
                            type="text"
                            name="phone"
                            className='form-control form-control-lg'
                            placeholder='Phone Number'
                            value={formData.phone}
                            onChange={handleChange}
                          />
                          {errors.phone && <small className="text-danger">{errors.phone}</small>}
                        </div>
                        <div className='col-md-6 mb-4'>
                          <label htmlFor="subject" className='form-label'>Subject</label>
                          <input
                            type="text"
                            name="subject"
                            className='form-control form-control-lg'
                            placeholder='Subject'
                            value={formData.subject}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className='form-label'>Message</label>
                        <textarea
                          name="message"
                          placeholder='Your message'
                          rows={5}
                          className='form-control form-control-lg'
                          value={formData.message}
                          onChange={handleChange}
                        ></textarea>
                        {errors.message && <small className="text-danger">{errors.message}</small>}
                      </div>

                      <button className='btn btn-primary large mt-3' type="submit">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default ContactUs;
