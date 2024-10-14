import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

const ServiceForm = ({ initialData, onSubmit }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [image, setImage] = useState(null); // For image file

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a FormData object to handle file upload
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) {
      formData.append('image', image); // Add the image file if selected
    }

    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => setImage(e.target.files[0])} // Get the selected file
        />
      </Form.Group>

      <Button type="submit" variant="primary" className="mt-3">
        Save
      </Button>
    </Form>
  );
};

export default ServiceForm;
