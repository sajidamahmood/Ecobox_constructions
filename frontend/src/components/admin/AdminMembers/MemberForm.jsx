import React, { useState } from 'react';
import './MemberForm.scss';


const MemberForm = ({ initialData = {}, onSubmit }) => {
  const [name, setName] = useState(initialData.name || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }
    onSubmit(formData);
    // Reset form after submission
    setName('');
    setDescription('');
    setImage(null);
  };

  return (
    <form className="member-form" onSubmit={handleSubmit}>
      <h2>{initialData.id ? 'Edit Member' : 'Add New Member'}</h2>
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label>Description:</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <label>Image:</label>
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        accept="image/*"
      />
      <button type="submit">{initialData.id ? 'Update Member' : 'Add Member'}</button>
    </form>
  );
};

export default MemberForm;
