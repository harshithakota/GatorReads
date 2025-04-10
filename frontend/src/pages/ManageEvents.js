import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Grid, Card, CardContent, Button,
  CircularProgress, Alert, Box, Stack, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle, Snackbar
} from '@mui/material';
import axios from 'axios';
import EventForm from '../components/EventForm'; // adjust path if needed

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    setLoading(true);
    axios.get('http://localhost:8083/getAllEvents')
      .then(response => {
        if (Array.isArray(response.data.events)) {
          setEvents(response.data.events);
        } else {
          setError("Unexpected data format from server");
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to fetch events");
        setLoading(false);
      });
  };

  const handleDelete = (eventId) => {
    setSelectedEventId(eventId);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    setEvents(prev => prev.filter(event => event.eventId !== selectedEventId));
    setConfirmOpen(false);
    setSelectedEventId(null);
    setSnackbarOpen(true);
  };

  const handleEdit = (event) => {
    setEventToEdit(event);
    setEditDialogOpen(true);
  };

  const handleUpdateEvent = (updatedEvent) => {
    setEvents(prev =>
      prev.map(ev => ev.eventId === eventToEdit.eventId ? { ...ev, ...updatedEvent } : ev)
    );
    setEditDialogOpen(false);
    setEventToEdit(null);
    setSnackbarOpen(true);
  };

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
    <Container maxWidth="lg" sx={{ mt: 16, mb: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Manage Events
      </Typography>

      <Grid container spacing={3}>
        {events.map(event => (
          <Grid item xs={12} sm={6} md={4} key={event.eventId}>
            <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', borderRadius: 2, boxShadow: 2 }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {event.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {`${event.EventDate} at ${event.eventTime}`}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  📍 {event.location}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {event.description}
                </Typography>
              </CardContent>

              <Box sx={{ px: 2, pb: 2 }}>
                <Stack direction="row" spacing={1}>
                  <Button variant="outlined" fullWidth onClick={() => handleEdit(event)}>
                    Edit
                  </Button>
                  <Button variant="contained" color="error" fullWidth onClick={() => handleDelete(event.eventId)}>
                    Delete
                  </Button>
                </Stack>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this event? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="primary">Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Form Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          {eventToEdit && (
            <EventForm
              initialData={eventToEdit}
              onSubmit={handleUpdateEvent}
              onClose={() => setEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Changes saved (not persisted to backend)"
      />
    </Container>
  );
};

export default ManageEvents;
