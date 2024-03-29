import React, { useState } from 'react';
import { Container, Grid, Typography, Button, Drawer, Box, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BuildIcon from '@mui/icons-material/Build';
import EventIcon from '@mui/icons-material/Event';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Paper from '@mui/material/Paper';
import styled from '@mui/material/styles/styled';
import logo from '../assets/logo.PNG';

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
      <Drawer
        anchor="right"
        variant="temporary"
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': { width: 250, boxSizing: 'border-box' },
        }}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <img src={logo} alt="ResidentMe Logo" style={{ maxWidth: '150px', margin: '16px' }} />
          <List>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Communication Board" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Second Hand Marketplace" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <BuildIcon />
              </ListItemIcon>
              <ListItemText primary="Work Order" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Booking" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText primary="Notifications" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

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
