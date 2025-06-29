import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import Footer from './FooterC';

const SignUp = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    userType: ''
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/SignUp', user)
      .then((res) => {
        alert('Record submitted');
        console.log(res.data.user);
        setUser({
          name: '',
          email: '',
          password: '',
          phone: '',
          userType: ''
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">ComplaintCare</Typography>
          <Box>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/signup">SignUp</Button>
            <Button color="inherit" component={Link} to="/login">Login</Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Signup Form */}
      <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
        <Card elevation={6}>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Sign Up For Registering the Complaint
            </Typography>
            <Typography variant="body2" align="center" color="textSecondary" gutterBottom>
              Please enter your details
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={user.name}
                onChange={handleChange}
                margin="normal"
                required
              />
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
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                type="tel"
                value={user.phone}
                onChange={handleChange}
                margin="normal"
                required
              />
              <FormControl fullWidth margin="normal" required>
                <InputLabel>User Type</InputLabel>
                <Select
                  name="userType"
                  value={user.userType}
                  onChange={handleChange}
                  label="User Type"
                >
                  <MenuItem value="Ordinary">Ordinary</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Agent">Agent</MenuItem>
                </Select>
              </FormControl>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                Register
              </Button>
            </Box>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2">
                Had an account?{' '}
                <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
                  Login
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

export default SignUp;
