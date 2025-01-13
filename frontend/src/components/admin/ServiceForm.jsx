import React, { useState, useEffect } from 'react';
import './Form.css';



const ServiceForm = ({ initialData = {}, onSubmit }) => {

  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [image, setImage] = useState(null); // For file input
  const [imageUrl, setImageUrl] = useState(initialData.image || ''); // For image preview or URL input

  useEffect(() => {
    setTitle(initialData.title || '');
    setDescription(initialData.description || '');
    setImageUrl(initialData.image || '');
  }, [initialData]);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file)); // Generate preview URL for file
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) {
      formData.append('image', image); // Attach file to the formData
    } else {
      formData.append('image', imageUrl); // Use image URL if no file is uploaded
    }
    onSubmit(formData); // Pass form data to the parent component
  };

  

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
      <div className="form-group ">
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
          disabled={!!image} // Disable if file upload is selected
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
  className="New mt-3">
  {initialData.id ? 'Update' : 'Create'}
</button>

    </form>
  );
};

export default ServiceForm;
