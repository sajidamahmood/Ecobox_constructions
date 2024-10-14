import React, { useState } from 'react';
import ServiceForm from '../AdminServices/ServiceForm'; // Import reusable form

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  // Handle form submission for creating/updating a testimonial
  const handleFormSubmit = (formData) => {
    if (editingTestimonial) {
      // Update existing testimonial
      const updatedTestimonials = testimonials.map(testimonial =>
        testimonial.id === editingTestimonial.id ? { ...testimonial, ...formData } : testimonial
      );
      setTestimonials(updatedTestimonials);
      setEditingTestimonial(null); // Reset form after editing
    } else {
      // Create new testimonial
      const newTestimonial = { id: Date.now(), ...formData };
      setTestimonials([...testimonials, newTestimonial]);
    }
  };

  // Handle delete testimonial
  const handleDelete = (id) => {
    const updatedTestimonials = testimonials.filter(testimonial => testimonial.id !== id);
    setTestimonials(updatedTestimonials);
  };

  // Handle edit testimonial
  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial); // Load the selected testimonial into the form
  };

  return (
    <div>
      <h1>Manage Testimonials</h1>

      {/* Form for adding/updating a testimonial */}
      <ServiceForm initialData={editingTestimonial || {}} onSubmit={handleFormSubmit} />

      {/* List of existing testimonials */}
      <h2>Existing Testimonials</h2>
      <ul className="list-group">
        {testimonials.map(testimonial => (
          <li key={testimonial.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{testimonial.title} (Slug: {testimonial.slug})</span>
            <div>
              <button className="btn btn-secondary mr-2" onClick={() => handleEdit(testimonial)}>Edit</button>
              <button className="btn btn-danger" onClick={() => handleDelete(testimonial.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminTestimonials;
