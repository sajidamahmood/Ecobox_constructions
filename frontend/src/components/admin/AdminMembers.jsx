import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axios';
import MemberForm from './MemberForm';
import './AdminMembers.css';

const AdminMembers = () => {
  const [members, setMembers] = useState([]);
  const [editingMember, setEditingMember] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/Members');
        setMembers(response.data);
      } catch (error) {
        setMessage('Error fetching members.');
        console.error('Error fetching members:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const handleFormSubmit = async (formData) => {
    try {
      if (editingMember) {
        const updatedMember = await axiosInstance.post(
          `/Members/update/${editingMember.id}`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        setMembers((prev) =>
          prev.map((member) =>
            member.id === updatedMember.data.id ? updatedMember.data : member
          )
        );
        setMessage('Member updated successfully!');
      } else {
        const newMember = await axiosInstance.post('/Members', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setMembers((prev) => [...prev, newMember.data]);
        setMessage('Member added successfully!');
      }
      setEditingMember(null);
    } catch (error) {
      setMessage('Error submitting form.');
      console.error('Error submitting form:', error);
    } finally {
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/Members/${id}`);
      setMembers((prev) => prev.filter((member) => member.id !== id));
      setMessage('Member deleted successfully!');
    } catch (error) {
      setMessage('Error deleting member.');
      console.error('Error deleting member:', error);
    } finally {
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
  };

  return (
    <div>
      <h1>Manage Members</h1>

      {message && <div className="alert alert-success">{message}</div>}

      <MemberForm
        key={editingMember ? editingMember.id : 'new'}
        initialData={editingMember || {}}
        onSubmit={handleFormSubmit}
      />

      <h2>Existing Members</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="list-group">
          {members.length > 0 ? (
            members.map((member) => (
              <li key={member.id} className="list-group-item">
                <div>
                  <strong>ID:</strong> {member.id}
                </div>
                <div>
                  <strong>Name:</strong> {member.name}
                </div>
                <div className="description">
                  <strong>Description:</strong> {member.description}
                </div>
                <div>
                  <strong>Image:</strong>
                  {member.image ? (
                    <img
                      src={`${axiosInstance.defaults.baseURL.replace(
                        '/api',
                        ''
                      )}${member.image_url}`}
                      alt={member.name}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/150';
                      }}
                    />
                  ) : (
                    <div>No image available</div>
                  )}
                </div>
                <div className="action-buttons">
                  <button
                    className="btn edit-btn m-2"
                    onClick={() => handleEdit(member)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn delete-btn"
                    onClick={() => handleDelete(member.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li>No members available</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default AdminMembers;

