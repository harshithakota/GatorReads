import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ufid: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8083/signin', formData);
      console.log('Login successful:', response.data);
      // alert('Login successful!');
      console.log(response.data.user.userFullName);
      props.setUserName(response.data.user.userFullName);
      props.setufid(response.data.user.ufid);
      localStorage.setItem('user', JSON.stringify({
        fullName: response.data.fullName,
        isLoggedIn: true
      }));
      props.setIsLoggedIn(true);
      if(response.data.user.isAdmin === true){
        navigate('/admin-dashboard');
      }
      else{
        navigate('/student-dashboard');
      }

      // Handle successful login (redirect, store token, etc.)
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error (show error message, etc.)
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
        <Typography component="h1" variant="h5">
          Sign in to GatorReads
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="ufid"
            label="UFID"
            name="ufid"
            autoFocus
            value={formData.ufid}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;