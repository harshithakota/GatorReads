import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, CircularProgress, Alert } from '@mui/material';

function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8083/getAllEvents')
            .then(response => {
                console.log(response.data); // Check the structure of the response data
                if (Array.isArray(response.data.events)) {
                    setEvents(response.data.events);  // Accessing the 'events' key
                } else {
                    setError("Received data is not formatted as expected");
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError('Failed to fetch events. Please try again later.');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <div>
            <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>Upcoming Events</Typography>
            {events.map(event => (
    <Card key={event.eventId} sx={{ mb: 2 }} data-cy="event-card">
        <CardContent>
            <Typography variant="h5">{event.title}</Typography>
            <Typography color="textSecondary" data-cy="event-date">{`${event.EventDate} at ${event.eventTime}`}</Typography>
            <Typography sx={{ my: 1 }}>{event.location}</Typography>
            <Typography paragraph data-cy="event-description">{event.description}</Typography>
            <Button variant="outlined" href={event.link} target="_blank">
                Learn More
            </Button>
        </CardContent>
    </Card>
))}

        </div>
    );
}

export default Events;