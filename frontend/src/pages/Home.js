import React from 'react';
import { Container, Paper, Grid, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BuildIcon from '@mui/icons-material/Build';
import EventIcon from '@mui/icons-material/Event';
import NotificationsIcon from '@mui/icons-material/Notifications';
import logo from '../assets/logo.PNG';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fdfbf7',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {/* Vision Statement Section */}
        <Grid item xs={12}>
          <Item>
            <Typography variant="h4" gutterBottom>
              Welcome to ResidentMe
            </Typography>
            <img src={logo} alt="ResidentMe Logo" style={{ maxWidth: '100px', height: 'auto' }} />
            <Typography variant="subtitle1" gutterBottom>
              Transforming the resident experience with seamless communication and resource sharing.
            </Typography>
          </Item>
        </Grid>

        {/* Features Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Item>
            <HomeIcon />
            <Typography variant="h6" gutterBottom>
              Communication Board
            </Typography>
            <Typography variant="body2">
              Easily post and access information relevant to your apartment.
            </Typography>
          </Item>
        </Grid>

        {/* Feature: Second Hand Goods Marketplace */}
        <Grid item xs={12} sm={6} md={4}>
          <Item>
            <ShoppingCartIcon />
            <Typography variant="h6" gutterBottom>
              Second Hand Marketplace
            </Typography>
            <Typography variant="body2">
              A place to connect over shared needs and interests.
            </Typography>
          </Item>
        </Grid>

        {/* Feature: Work Order */}
        <Grid item xs={12} sm={6} md={4}>
          <Item>
            <BuildIcon />
            <Typography variant="h6" gutterBottom>
              Work Order
            </Typography>
            <Typography variant="body2">
              Report and track maintenance issues within your apartment.
            </Typography>
          </Item>
        </Grid>

        {/* Feature: Events Booking */}
        <Grid item xs={12} sm={6} md={4}>
          <Item>
            <EventIcon />
            <Typography variant="h6" gutterBottom>
              Booking
            </Typography>
            <Typography variant="body2">
              Browse and book events or rooms based on availability.
            </Typography>
          </Item>
        </Grid>

        {/* Feature: Notification Feature */}
        <Grid item xs={12} sm={6} md={4}>
          <Item>
            <NotificationsIcon />
            <Typography variant="h6" gutterBottom>
              Notifications
            </Typography>
            <Typography variant="body2">
              Stay updated with real-time notifications for the community.
            </Typography>
          </Item>
        </Grid>

      </Grid>

      <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ marginTop: '20px' }}>
        <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'center', padding: '0 10px' }}>
          <Button variant="outlined" color="primary" style={{ marginRight: '10px' }}>
            Join Us Now
          </Button>
          <Button variant="contained" color="primary" style={{ marginLeft: '10px' }}>
            Login Here
          </Button>
        </Grid>
      </Grid>

    </Container>
  );
};

export default HomePage;