import React, { useState, useEffect } from 'react';
import './Form.css';

const ProjectForm = ({ initialData = {}, onSubmit }) => {

  const [name, setName] = useState(initialData.name || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(initialData.image || '');
  const [startDate, setStartDate] = useState(initialData.start_date || ''); // Added start_date
  const [endDate, setEndDate] = useState(initialData.end_date || ''); // Added end_date

  useEffect(() => {
    setName(initialData.name || '');
    setDescription(initialData.description || '');
    setImageUrl(initialData.image || '');
    setStartDate(initialData.start_date || ''); // Sync with initialData
    setEndDate(initialData.end_date || ''); // Sync with initialData
  }, [initialData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('start_date', startDate); // Include start_date
    formData.append('end_date', endDate); // Include end_date
    if (image) {
      formData.append('image', image);
    }
    onSubmit(formData); // Pass the data to parent component
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          className="form-control"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="start_date">Start Date</label>
        <input
          type="date"
          id="start_date"
          className="form-control"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="end_date">End Date</label>
        <input
          type="date"
          id="end_date"
          className="form-control"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          className="form-control-file mb-2"
          accept="image/*"
          onChange={handleImageChange}
        />
        <small className="form-text text-muted">Or enter an image URL below:</small>
        <input
          type="text"
          id="image-url"
          className="form-control"
          placeholder="Enter image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          disabled={!!image}
        />
        {imageUrl && (
          <div className="mt-3">
            <strong>Preview:</strong>
            <img src={imageUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '150px' }} />
          </div>
        )}
      </div>
      <button 
        type="submit" 
        className="New mt-3" 
        style={{
          backgroundColor: '#f96302', 
          color: '#fff',              
          padding: '10px 20px',       
          border: 'none',             
          borderRadius: '5px',        
          fontSize: '16px',           
          cursor: 'pointer',          
          transition: 'background-color 0.3s',
        }}
      >
        {initialData.id ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default ProjectForm;
