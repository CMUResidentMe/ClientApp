import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Button, Box, IconButton, Slide, Card, CardContent, CardMedia, CardActionArea } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Navbar from '../components/NavBar';
import backgroundImage from '../assets/bg.jpg';
import communityImage from '../assets/community.png';
import marketplaceImage from '../assets/marketplace.png';
import workOrderImage from '../assets/workorder.png';
import bookingImage from '../assets/booking.png';

const HomePage = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', overflow: 'hidden' }}>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="flex-end">
          <IconButton color="inherit" aria-label="menu" onClick={handleDrawerToggle} sx={{ margin: 1 }}>
            <MenuIcon />
          </IconButton>
        </Box>
        <Navbar isDrawerOpen={isDrawerOpen} handleDrawerToggle={handleDrawerToggle} />
        <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
          <Box sx={{ color: '#fff' }}>
            <Typography variant="h2" component="h1" gutterBottom>
              Welcome to ResidentMe
            </Typography>
            <Typography variant="h5" gutterBottom>
              Transforming the resident experience with seamless communication and resource sharing.
            </Typography>
            <Typography variant="body1" paragraph>
              Our platform offers a unified solution to enhance community engagement and streamline resource sharing among residents.
            </Typography>
          </Box>
        </Slide>
      </Container>
      <Grid container spacing={3} justifyContent="center" sx={{ padding: 4 }}>
        {[
          { name: "Community Board", description: "A central place for residents to post discussions, share information, and stay connected with their neighbors.", image: communityImage },
          { name: "Marketplace", description: "An organized platform for buying and selling goods within the community, promoting sustainability and convenience.", image: marketplaceImage },
          { name: "Work Order", description: "Efficiently report and track maintenance issues within your apartment or building, ensuring quick and effective resolution.", image: workOrderImage },
          { name: "Booking", description: "Easily browse, book, and manage reservations for community amenities like event spaces, meeting rooms, and more.", image: bookingImage }
        ].map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ maxWidth: 345, background: 'rgba(255,255,255,0.8)' }}>
              <CardActionArea>
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
      <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ marginTop: '20px' }}>
        <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'center', padding: '0 10px' }}>
          <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
            Join Us Now
          </Button>
          <Button variant="contained" color="primary" style={{ marginLeft: '10px' }}>
            Login Here
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
