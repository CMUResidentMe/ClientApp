import React, { useState } from 'react';
import { Container, Grid, Typography, Button, Drawer, Box, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Navbar from '../components/NavBar';

const HomePage = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="flex-end">
        <IconButton color="inherit" aria-label="menu" onClick={handleDrawerToggle} sx={{ margin: 1 }}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Navbar isDrawerOpen={isDrawerOpen} handleDrawerToggle={handleDrawerToggle} />
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={8}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to ResidentMe
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Transforming the resident experience with seamless communication and resource sharing.
          </Typography>
          <Typography variant="body1" paragraph>
            Our platform offers a unified solution to enhance community engagement and streamline resource sharing among residents.
          </Typography>
          <Button variant="contained" sx={{ margin: 1 }}>
            Learn More
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
