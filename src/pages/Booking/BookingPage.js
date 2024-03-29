import React, { useState, useEffect } from 'react';
import { Container, Box, IconButton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Navbar from '../../components/NavBar';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';

const BookingPage = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <Container maxWidth="lg" sx={{ boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.25)', backgroundColor: 'rgba(255, 255, 255, 0.85)', paddingTop: '1rem', paddingBottom: '2rem', paddingLeft: '2rem', paddingRight: '2rem', borderRadius: '8px' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginBottom: '0.5rem' }}>
        <Typography variant="h3" component="h1" sx={{ flexGrow: 1 }}>
          Here is booking page
        </Typography>
        <IconButton color="inherit" aria-label="menu" onClick={handleDrawerToggle} sx={{ margin: 1 }}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Navbar isDrawerOpen={isDrawerOpen} handleDrawerToggle={handleDrawerToggle} />
    </Container>
  );
};

export default BookingPage;