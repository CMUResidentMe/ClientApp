import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Button, Box, IconButton, Slide, Card, CardContent, CardMedia, CardActionArea } from '@mui/material';
import { MenuBookOutlined } from '@mui/icons-material';
import Navbar from '../components/NavBar.js';
import backgroundImage from '../assets/background.gif';
import communityImage from '../assets/community.png';
import marketplaceImage from '../assets/marketplace.png';
import workOrderImage from '../assets/workorder.png';
import bookingImage from '../assets/booking.png';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setChecked(true);
  }, []);

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  // const handleCardClick = (path) => {
  //   const isAuthenticated = true;

  //   if (isAuthenticated) {
  //     navigate(path);
  //   } else {
  //     navigate('/login');
  //   }
  // };

  const handleCardClick = (path) => {
      navigate(path);
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', overflow: 'hidden' , minHeight: '100vh'}}>
      <Container maxWidth="lg" sx={{ boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.25)', backgroundColor: 'rgba(255, 255, 255, 0.85)', paddingTop: '1rem', paddingBottom: '2rem', paddingLeft: '2rem', paddingRight: '2rem', borderRadius: '8px' }}>
        <Box display="flex" justifyContent="flex-end" sx={{ marginBottom: '0.5rem' }}>
          <IconButton color="inherit" aria-label="menu" onClick={handleDrawerToggle} sx={{ margin: 1 }}>
            <MenuBookOutlined />
          </IconButton>
        </Box>
        <Navbar isDrawerOpen={isDrawerOpen} handleDrawerToggle={handleDrawerToggle} />
        <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
          <Box sx={{ color: '#2B1B17' }}>
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontFamily: 'Merriweather, serif', fontWeight: 'bold', marginTop: '0' }}>
              Welcome to ResidentMe
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Roboto, sans-serif' }}>
              Transforming the resident experience with seamless communication and resource sharing.
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontFamily: 'Open Sans, sans-serif' }}>
              Our platform offers a unified solution to enhance community engagement and streamline resource sharing among residents.
            </Typography>
          </Box>
        </Slide>
      </Container>
      <Grid container spacing={3} justifyContent="center" sx={{ padding: 4 }}>
        {[
          { name: "Community Board", path: "/community-board", description: "A central place for residents to post discussions, share information, and stay connected with their neighbors.", image: communityImage },
          { name: "Marketplace", path: "/marketplace", description: "An organized platform for buying and selling goods within the community, promoting sustainability and convenience.", image: marketplaceImage },
          { name: "Work Order", path: "/work-order", description: "Efficiently report and track maintenance issues within your apartment or building, ensuring quick and effective resolution.", image: workOrderImage },
          { name: "Booking", path: "/booking", description: "Easily browse, book, and manage reservations for community amenities like event spaces, meeting rooms, and more.", image: bookingImage }
        ].map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ maxWidth: 345, background: 'rgba(255,255,255,0.8)' }}>
              <CardActionArea onClick={() => handleCardClick(feature.path)}>
                <CardMedia
                  component="img"
                  height="140"
                  image={feature.image}
                  alt={feature.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {feature.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
