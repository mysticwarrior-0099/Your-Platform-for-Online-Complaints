import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Footer from './FooterC';

const Home = () => {
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

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 8, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Left side - Image */}
        <Box sx={{ flex: 1, mb: { xs: 4, md: 0 } }}>
          <img 
            src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/cc16ddf3-4816-4555-abe4-8ff9363a5f5e.png" 
            alt="Customer support team helping clients with friendly service" 
            style={{ width: '100%', maxWidth: 500 }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0e22dfe6-c18d-4be7-a44a-0e3e15e0247b.png';
            }}
          />
        </Box>

        {/* Right side - Text and CTA */}
        <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            Streamline Your Support,
          </Typography>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Transform Complaints into Opportunities with Our
          </Typography>
          <Typography variant="h5" sx={{ fontStyle: 'italic', mb: 3 }}>
            Customer Experience Platform
          </Typography>
          <Button variant="contained" size="large" component={Link} to="/Login">
            Get Started Now
          </Button>
        </Box>
      </Container>

      <Footer />
    </>
  );
};

export default Home;

