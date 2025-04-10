import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Card,
    CardContent,
    Typography,
    Button,
    CircularProgress,
    Alert,
    Grid,
    Box,
    Container
} from '@mui/material';

function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8083/getAllEvents')
            .then(response => {
                if (Array.isArray(response.data.events)) {
                    setEvents(response.data.events);
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
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>
                🎉 Upcoming Events
            </Typography>

            <Grid container spacing={3}>
                {events.map(event => (
                    <Grid item xs={12} sm={6} md={4} key={event.eventId}>
                        <Card
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                height: '100%',
                                borderRadius: 3,
                                boxShadow: 3,
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'scale(1.02)'
                                }
                            }}
                            data-cy="event-card"
                        >
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" fontWeight="bold" gutterBottom>
                                    {event.title}
                                </Typography>

                                <Typography color="textSecondary" data-cy="event-date">
                                    {`${event.EventDate} at ${event.eventTime}`}
                                </Typography>

                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    📍 {event.location}
                                </Typography>

                                <Typography paragraph sx={{ mt: 1 }} data-cy="event-description">
                                    {event.description}
                                </Typography>
                            </CardContent>

                            <Box sx={{ px: 2, pb: 2 }}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    href={event.link}
                                    target="_blank"
                                >
                                    Learn More
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Events;
