import React, { useState, useEffect } from "react";
import { TextField, Button, Stack } from "@mui/material";

const BookForm = ({ initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    bookFullName: "",
    authorName: "",
    bookCount: 0,
    imageData: ""
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField label="Book Name" name="bookFullName" value={formData.bookFullName} onChange={handleChange} fullWidth required />
        <TextField label="Author Name" name="authorName" value={formData.authorName} onChange={handleChange} fullWidth required />
        <TextField label="Book Count" name="bookCount" type="number" value={formData.bookCount} onChange={handleChange} fullWidth required />
        <TextField label="Image URL" name="imageData" value={formData.imageData} onChange={handleChange} fullWidth />
        <Stack direction="row" spacing={2}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">Save</Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default BookForm;
