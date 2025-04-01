import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Box, Grid } from '@mui/material';
import axios from 'axios';

function AddEvent() {
    const [eventData, setEventData] = useState({
        eventId: '',  // Added eventId to the form state
        title: '',
        description: '',
        eventDate: '',
        eventTime: '',
        location: '',
        link: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedData = {
            ...eventData,
            eventDate: eventData.eventDate + "T00:00:00Z",
            eventTime: eventData.eventDate + "T" + eventData.eventTime + ":00Z"
        };

        axios.post('http://localhost:8083/addEvent', formattedData)
            .then(response => {
                alert('Event added successfully');
                setEventData({ eventId: '', title: '', description: '', eventDate: '', eventTime: '', location: '', link: '' }); // Reset form after saving
            })
            .catch(error => {
                console.error('Error adding event:', error);
                alert('Failed to add event: ' + error.message);
            });
    };

    return (
        <Box display="flex" justifyContent="center" mt={15}>
            <Card sx={{ width: '90%', maxWidth: 500 }}>
                <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>Add New Event</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Event ID"
                            name="eventId"
                            value={eventData.eventId}
                            onChange={handleChange}
                            fullWidth
                            required
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Title"
                            name="title"
                            value={eventData.title}
                            onChange={handleChange}
                            fullWidth
                            required
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Description"
                            name="description"
                            multiline
                            rows={3}
                            value={eventData.description}
                            onChange={handleChange}
                            fullWidth
                            required
                            sx={{ mb: 2 }}
                        />
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    label="Date"
                                    name="eventDate"
                                    type="date"
                                    value={eventData.eventDate}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    sx={{ mb: 2 }}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Time"
                                    name="eventTime"
                                    type="time"
                                    value={eventData.eventTime}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    sx={{ mb: 2 }}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                        </Grid>
                        <TextField
                            label="Location"
                            name="location"
                            value={eventData.location}
                            onChange={handleChange}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Link"
                            name="link"
                            value={eventData.link}
                            onChange={handleChange}
                            fullWidth
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Add Event
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}

export default AddEvent;