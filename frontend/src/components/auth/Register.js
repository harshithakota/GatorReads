import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Paper,
  Tabs,
  Tab,
  Alert,
  Snackbar
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0); // 0 for student, 1 for admin
  const [formData, setFormData] = useState({
    userType: 'student',
    userFullName: '',
    ufid: '',
    employeeId: '',
    dob: '',
    gender: '',
    email: '',
    password: '',
    isAdmin: false
  });
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    type: 'success'
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setFormData({
      ...formData,
      userType: newValue === 0 ? 'student' : 'admin',
      isAdmin: newValue === 1,
      ufid: '',
      employeeId: ''
    });
  };

  const handleClose = () => {
    setNotification({
      ...notification,
      open: false
    });
  };

// In Register.js, update handleSubmit:
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending registration data:', formData); // Debug log
      const response = await axios.post('http://localhost:8083/register', formData);
      console.log('Registration response:', response.data);
      setNotification({
        open: true,
        message: 'Registration successful! Redirecting to login...',
        type: 'success'
      });
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error('Registration error:', error.response || error);
      setNotification({
        open: true,
        message: error.response?.data?.error || 'Registration failed',
        type: 'error'
      });
    }
};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 15,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper sx={{ width: '100%', mb: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            centered
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Student Registration" />
            <Tab label="Admin Registration" />
          </Tabs>
        </Paper>

        <Typography component="h1" variant="h5">
          {tabValue === 0 ? 'Student Registration' : 'Admin Registration'}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="userFullName"
            label="Full Name"
            type="text"
            value={formData.userFullName}
            onChange={handleChange}
          />

          {/* Show Admission ID field only for students */}
          {tabValue === 0 && (
            <TextField
              margin="normal"
              required
              fullWidth
              name="ufid"
              label="UFID"
              type="text"
              value={formData.ufid}
              onChange={handleChange}
            />
          )}

          {/* Show Employee ID field only for admins */}
          {tabValue === 1 && (
            <TextField
              margin="normal"
              required
              fullWidth
              name="employeeId"
              label="Employee ID"
              type="text"
              value={formData.employeeId}
              onChange={handleChange}
            />
          )}

          <TextField
            margin="normal"
            required
            fullWidth
            name="dob"
            label="Date of Birth"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.dob}
            onChange={handleChange}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={formData.gender}
              label="Gender"
              onChange={handleChange}
              required
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>

          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>

          <Button
            fullWidth
            variant="text"
            onClick={() => navigate('/login')}
          >
            Already have an account? Sign in
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleClose} 
          severity={notification.type} 
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    
    </Container>
  );
};

export default Register;