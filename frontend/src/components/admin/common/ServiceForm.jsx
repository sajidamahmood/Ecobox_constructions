import React, { useState, useEffect } from 'react';

const ServiceForm = ({ initialData, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [image, setImage] = useState(null); // Handle image uploads

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.name || '');
      setSlug(initialData.slug || '');
    }
  }, [initialData]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: title,
      slug,
      image, // Assuming you'll handle this image uploading logic
    };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="form-group">
        <label htmlFor="title">Project Name</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="slug">Slug</label>
        <input
          type="text"
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        {initialData.id ? 'Update Project' : 'Create Project'}
      </button>
      {initialData.id && <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel Edit</button>}
    </form>
  );
};

export default ServiceForm;
