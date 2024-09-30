import React, { useState } from "react";
import AdminDashboard from "./AdminDashboard";

const ParentComponent = () => {
  const [items, setItems] = useState([
    { id: 1, title: "Item 1", slug: "item-1", image: "path/to/image1.jpg" },
    { id: 2, title: "Item 2", slug: "item-2", image: "path/to/image2.jpg" },
    // Add more items as needed
  ]);

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleUpdate = (id) => {
    // Implement the update logic here, e.g., opening a modal or navigating to an update form
    console.log(`Update item with id: ${id}`);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <AdminDashboard items={items} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  );
};

export default ParentComponent;
