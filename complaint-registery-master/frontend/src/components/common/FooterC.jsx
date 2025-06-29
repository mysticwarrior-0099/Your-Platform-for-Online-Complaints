import React from 'react';
import { Box, Typography, Grid, Link, IconButton, Container } from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon
} from '@mui/icons-material';

export default function FooterC() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.default',
        color: 'text.primary',
        py: 4,  // Reduced padding
        px: 2,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2}> {/* Reduced spacing */}
          {/* Company Info */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
              ComplaintCare
            </Typography>
            <Typography variant="body2" paragraph sx={{ mb: 1, fontSize: '0.8rem' }}>
              Transforming complaints into opportunities
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="small" aria-label="Facebook" color="inherit">
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" aria-label="Twitter" color="inherit">
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" aria-label="LinkedIn" color="inherit">
                <LinkedInIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" aria-label="Email" color="inherit">
                <EmailIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" underline="hover" display="block" mb={0.5} fontSize="0.8rem">Home</Link>
            <Link href="/about" color="inherit" underline="hover" display="block" mb={0.5} fontSize="0.8rem">About</Link>
            <Link href="/contact" color="inherit" underline="hover" display="block" fontSize="0.8rem">Contact</Link>
          </Grid>

          {/* Legal */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Legal
            </Typography>
            <Link href="/privacy" color="inherit" underline="hover" display="block" mb={0.5} fontSize="0.8rem">Privacy</Link>
            <Link href="/terms" color="inherit" underline="hover" display="block" fontSize="0.8rem">Terms</Link>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Contact
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.8rem', mb: 0.5 }}>
              hello@complaintcare.com
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
              (123) 456-7890
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ 
          mt: 3, 
          pt: 2, 
          borderTop: '1px solid', 
          borderColor: 'divider', 
          textAlign: 'center' 
        }}>
          <Typography variant="caption">
            &copy; {new Date().getFullYear()} ComplaintCare
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
