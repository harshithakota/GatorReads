import React, { useState, useEffect } from 'react';
import { TextField, Button, Stack } from '@mui/material';

const EventForm = ({ initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    EventDate: '',
    eventTime: '',
    location: '',
    description: '',
    link: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
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
        <TextField name="title" label="Title" fullWidth required value={formData.title} onChange={handleChange} />
        <TextField name="EventDate" label="Date" type="date" fullWidth required InputLabelProps={{ shrink: true }} value={formData.EventDate} onChange={handleChange} />
        <TextField name="eventTime" label="Time" type="time" fullWidth required InputLabelProps={{ shrink: true }} value={formData.eventTime} onChange={handleChange} />
        <TextField name="location" label="Location" fullWidth required value={formData.location} onChange={handleChange} />
        <TextField name="description" label="Description" fullWidth multiline rows={3} value={formData.description} onChange={handleChange} />
        <TextField name="link" label="Link" fullWidth value={formData.link} onChange={handleChange} />
        <Stack direction="row" spacing={2}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">Save</Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default EventForm;
