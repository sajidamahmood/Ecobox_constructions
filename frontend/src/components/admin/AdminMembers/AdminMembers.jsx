import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import MemberForm from './MemberForm';

const API_URL = 'http://127.0.0.1:8000/api/members';  

const AdminMembers = () => {
  const [members, setMembers] = useState([]);
  const [editingMember, setEditingMember] = useState(null);

  // Fetch all members from the API
  useEffect(() => {
    axios.get(API_URL)
      .then(response => setMembers(response.data))
      .catch(error => console.error('Error fetching members:', error));
  }, []);

  // Handle form submission for creating/updating a member
  const handleFormSubmit = (formData) => {
    if (editingMember) {
      // Update existing member
      axios.put(`${API_URL}/${editingMember.id}`, formData)
        .then(response => {
          const updatedMembers = members.map(member =>
            member.id === editingMember.id ? response.data : member
          );
          setMembers(updatedMembers);
          setEditingMember(null);  // Reset form after editing
        })
        .catch(error => console.error('Error updating member:', error));
    } else {
      // Create new member
      axios.post(API_URL, formData)
        .then(response => {
          setMembers([...members, response.data]);
        })
        .catch(error => console.error('Error creating member:', error));
    }
  };

  // Handle delete member
  const handleDelete = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setMembers(members.filter(member => member.id !== id));
      })
      .catch(error => console.error('Error deleting member:', error));
  };

  // Handle edit member
  const handleEdit = (member) => {
    setEditingMember(member);  // Load the selected member into the form
  };

  return (
    <div>
      <h1>Manage Members</h1>

      {/* Form for adding/updating a member */}
      <MemberForm initialData={editingMember || {}} onSubmit={handleFormSubmit} />

      {/* List of existing members */}
      <h2>Existing Members</h2>
      <ul className="list-group">
        {members.map(member => (
          <li key={member.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{member.name} (Image: {member.image_url})</span>
            <div>
              <button className="btn btn-secondary mr-2" onClick={() => handleEdit(member)}>Edit</button>
              <button className="btn btn-danger" onClick={() => handleDelete(member.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminMembers;
