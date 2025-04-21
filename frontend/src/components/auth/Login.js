import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  Link
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    ufid: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8083/signin', formData);
      console.log('Login successful:', response.data);
      props.setUserName(response.data.user.userFullName);
      props.setufid(response.data.user.ufid);
      localStorage.setItem('user', JSON.stringify({
        fullName: response.data.fullName,
        isLoggedIn: true
      }));
      props.setIsLoggedIn(true);
      if (response.data.user.isAdmin === true) {
        navigate('/admin-dashboard');
      } else {
        navigate('/student-dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ backgroundColor: '#f7f9fc',
        paddingTop: 1
       }}
    >
      <Container maxWidth="xs" sx={{mt:4}}>
        <Paper elevation={5} sx={{ padding: 4, borderRadius: 2 }}>
          
          <Typography variant="body1" align="center" sx={{ mb: 3 }}>
            Please sign in to continue
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Box mb={2}>
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
            </Box>
            <Box mb={2}>
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
            </Box>
            <Box mt={2}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Box>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Don’t have an account? <Link href="/register">Register here</Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
