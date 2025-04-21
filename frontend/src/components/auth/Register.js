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
  Snackbar,
  Link
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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setFormData({
      ...formData,
      userType: newValue === 0 ? 'student' : 'admin',
      isAdmin: newValue === 1,
      ufid: ''
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleClose = () => {
    setNotification({
      ...notification,
      open: false
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.ufid.trim()) {
      setNotification({ open: true, message: "UFID is required!", type: "error" });
      return;
    }

    try {
      const response = await axios.post('http://localhost:8083/register', formData);
      setNotification({
        open: true,
        message: 'Registration successful! Redirecting to login...',
        type: 'success'
      });

      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setNotification({
        open: true,
        message: error.response?.data?.error || 'Registration failed',
        type: 'error'
      });
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      sx={{ backgroundColor: '#f7f9fc',
        py: 6
       }}
    >
      <Container component="main" maxWidth="xs">
        <Paper elevation={5} sx={{ padding: 4, borderRadius: 2, my:4 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            centered
            sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
          >
            <Tab label="Student" />
            <Tab label="Admin" />
          </Tabs>

          <Typography component="h1" variant="h5" align="center" gutterBottom>
            {tabValue === 0 ? 'Student Registration' : 'Admin Registration'}
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>

            <Typography variant="body2" align="center">
              Already have an account? <Link href="/login">Login here</Link>
            </Typography>
          </Box>
        </Paper>
      </Container>

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
    </Box>
  );
};

export default Register;
