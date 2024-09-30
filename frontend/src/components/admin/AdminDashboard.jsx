import React, { useState } from 'react';
import './AdminDashboard.css'; // Import the CSS file

const AdminDashboard = () => {
  const [records, setRecords] = useState([]);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [imageFile, setImageFile] = useState(null); // For storing the selected image file
  const [imagePreview, setImagePreview] = useState(''); // For displaying the image preview
  const [currentId, setCurrentId] = useState(null); // For tracking the current record to edit

  const handleSubmit = (e) => {
    e.preventDefault();
    const imageUrl = imageFile ? URL.createObjectURL(imageFile) : '';

    if (currentId) {
      // Update existing record
      setRecords(records.map(record => 
        record.id === currentId ? { id: currentId, title, slug, image: imageUrl } : record
      ));
      setCurrentId(null);
    } else {
      // Create new record
      const newRecord = {
        id: records.length + 1, // Simple ID assignment
        title,
        slug,
        image: imageUrl,
      };
      setRecords([...records, newRecord]);
    }
    clearForm();
  };

  const handleEdit = (record) => {
    setTitle(record.title);
    setSlug(record.slug);
    setImagePreview(record.image);
    setCurrentId(record.id);
  };

  const handleDelete = (id) => {
    setRecords(records.filter(record => record.id !== id));
  };

  const clearForm = () => {
    setTitle('');
    setSlug('');
    setImageFile(null);
    setImagePreview('');
    setCurrentId(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
      </header>
      <div className="dashboard-content">
        <main className="main-content">
          <form onSubmit={handleSubmit} className="crud-form">
            <h2>CRUD Operations</h2>
            <div className="form-group">
              <label htmlFor="title">Title</label>
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
                accept="image/*" // Accept image files only
                onChange={handleImageChange}
                required
              />
            </div>
            {imagePreview && (
              <div className="image-preview">
                <h4>Image Preview:</h4>
                <img src={imagePreview} alt="Preview" className="record-image-preview" />
              </div>
            )}
            <div className="button-group">
              <button type="submit" className="btn btn-primary">
                {currentId ? 'Update' : 'Create'}
              </button>
              <button type="button" onClick={clearForm} className="btn btn-secondary">Clear</button>
            </div>
          </form>
          <div className="records-list">
            <h2>Records</h2>
            {records.length === 0 ? (
              <p>No records found.</p>
            ) : (
              records.map(record => (
                <div key={record.id} className="record-item">
                  <p><strong>ID:</strong> {record.id}</p>
                  <p><strong>Title:</strong> {record.title}</p>
                  <p><strong>Slug:</strong> {record.slug}</p>
                  <p><strong>Image:</strong> <img src={record.image} alt={record.title} className="record-image" /></p>
                  <div className="button-group">
                    <button onClick={() => handleEdit(record)} className="btn btn-secondary">Edit</button>
                    <button onClick={() => handleDelete(record.id)} className="btn btn-danger">Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
