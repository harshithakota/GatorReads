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

  // Handle tab change between Student and Admin
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setFormData({
      ...formData,
      userType: newValue === 0 ? 'student' : 'admin',
      isAdmin: newValue === 1, // Admins get `isAdmin: true`
      ufid: '' // Reset UFID when switching
    });
  };
  

  // Handle form field changes
  const handleChange = (e) => {
    console.log('e', e);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    console.log(formData);
  };

  // Close notification
  const handleClose = () => {
    setNotification({
      ...notification,
      open: false
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.ufid.trim()) {
      setNotification({ open: true, message: "UFID is required!", type: "error" });
      return;
    }

    console.log('Final Form Data Before Sending:', formData); // Debugging

    try {
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

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Tab Selection for Student/Admin */}
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

        {/* Registration Form */}
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

          {/* ✅ UFID Field (Used for both Students & Admins) */}
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

          {/* Register Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>

          {/* Login Redirect Button */}
          <Button
            fullWidth
            variant="text"
            onClick={() => navigate('/login')}
          >
            Already have an account? Sign in
          </Button>
        </Box>
      </Box>

      {/* Notification Snackbar */}
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
