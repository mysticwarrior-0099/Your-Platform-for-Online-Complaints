import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import Footer from './FooterC';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post('http://localhost:8000/Login', user)
      .then((res) => {
        alert('Successfully logged in');
        localStorage.setItem('user', JSON.stringify(res.data));
        const isLoggedIn = JSON.parse(localStorage.getItem('user'));
        const { userType } = isLoggedIn;
        switch (userType) {
          case 'Admin':
            navigate('/AdminHome');
            break;
          case 'Ordinary':
            navigate('/HomePage');
            break;
          case 'Agent':
            navigate('/AgentHome');
            break;
          default:
            navigate('/Login');
            break;
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          alert('User doesn`t exist');
        }
        navigate('/Login');
      });
  };

  return (
    <>
      {/* Navigation Bar */}
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">ComplaintCare</Typography>
          <Box>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
            <Button color="inherit" component={Link} to="/login">Login</Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Login Form Section */}
      <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
        <Card elevation={6}>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Login For Registering the Complaint
            </Typography>
            <Typography variant="body2" align="center" color="textSecondary" gutterBottom>
              Please enter your credentials!
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={user.password}
                onChange={handleChange}
                margin="normal"
                required
              />
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                Login
              </Button>
            </Box>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2">
                Don&apos;t have an account?{' '}
                <Link to="/signup" style={{ textDecoration: 'none', color: '#1976d2' }}>
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>

      <Footer />
    </>
  );
};

export default Login;
