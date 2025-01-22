import React, { useState } from "react";
import axios from "axios";
import axiosInstance from '../../api/axios';
import CreateMessage from "./CreateMessage";



const QuoteForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    postalCode: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  // Validation function
  const validate = () => {
    const newErrors = {};

    if (!formData.name || formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters long.";
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }

    if (!formData.postalCode || !/^\d{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = "Postal Code must be 5 digits.";
    }

    if (!formData.description || formData.description.length < 10) {
      newErrors.description = "Project description must be at least 10 characters long.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear specific errors
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (name === "name" && value.length >= 3) delete newErrors.name;
      if (name === "email" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) delete newErrors.email;
      if (name === "phone" && /^\d{10}$/.test(value)) delete newErrors.phone;
      if (name === "postalCode" && /^\d{5}$/.test(value)) delete newErrors.postalCode;
      if (name === "description" && value.length >= 10) delete newErrors.description;
      return newErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axiosInstance.post("http://127.0.0.1:8000/api/send-contact-mail", formData);
      setStatus("Email sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        postalCode: "",
        description: "",
      });
    } catch (error) {
      console.error(error);
      setStatus("Failed to send email. Please try again.");
    }
  };

  return (
    <div className="quote-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name*"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email*"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          type="tel"
          name="phone"
          placeholder="Phone*"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        {errors.phone && <p className="error">{errors.phone}</p>}

        <input
          type="text"
          name="postalCode"
          placeholder="Code Postal*"
          value={formData.postalCode}
          onChange={handleChange}
          required
        />
        {errors.postalCode && <p className="error">{errors.postalCode}</p>}

        <textarea
          name="description"
          placeholder="Description du projet*"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
        {errors.description && <p className="error">{errors.description}</p>}

        <button type="submit">Recevez votre devis gratuit</button>
      </form>

      {status && <p className={status.includes("successfully") ? "success" : "error"}>{status}</p>}
    </div>
  );
};

export default QuoteForm;
