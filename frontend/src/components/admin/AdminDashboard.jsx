import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css'; // Your existing CSS for styling

const API_URL = 'http://127.0.0.1:8000/api/projects'; // Update with your API endpoint for projects

const AdminDashboard = () => {
  const [records, setRecords] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [currentId, setCurrentId] = useState(null);

  // Fetch existing projects from the backend on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(API_URL);
        setRecords(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('start_date', startDate);
    formData.append('end_date', endDate);
    if (imageFile) {
      formData.append('image', imageFile); // Attach the image file if available
    }

    try {
      if (currentId) {
        // Update existing record
        const response = await axios.put(`${API_URL}/${currentId}`, formData);
        setRecords(records.map(record => 
          record.id === currentId ? response.data : record
        ));
        setCurrentId(null);
      } else {
        // Create new record
        const response = await axios.post(API_URL, formData);
        setRecords([...records, response.data]);
      }
      clearForm();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEdit = (record) => {
    setName(record.name);
    setDescription(record.description);
    setStartDate(record.start_date);
    setEndDate(record.end_date);
    setImagePreview(record.image);
    setCurrentId(record.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setRecords(records.filter(record => record.id !== id));
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const clearForm = () => {
    setName('');
    setDescription('');
    setStartDate('');
    setEndDate('');
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
          <h2>CRUD Operations</h2>
          <form onSubmit={handleSubmit} className="crud-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="start_date">Start Date</label>
              <input
                type="date"
                id="start_date"
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
                accept="image/*" 
                onChange={handleImageChange}
                required
              />
            </div>
            {imagePreview && (
              <div className="image-preview">
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
                  <p><strong>Name:</strong> {record.name}</p>
                  <p><strong>Description:</strong> {record.description}</p>
                  <p><strong>Start Date:</strong> {record.start_date}</p>
                  <p><strong>End Date:</strong> {record.end_date}</p>
                  <p><strong>Image:</strong> <img src={record.image} alt={record.name} className="record-image" /></p>
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
