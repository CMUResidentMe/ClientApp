import React, { useState } from 'react';
import { Container, Paper, Grid, Typography, Button, Box, List, ListItem, ListItemIcon, ListItemText, useTheme, Drawer, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BuildIcon from '@mui/icons-material/Build';
import EventIcon from '@mui/icons-material/Event';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu'; // Importing Menu icon for the toggle button
import logo from '../assets/logo.PNG';

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  color: theme.palette.getContrastText(theme.palette.primary.main),
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fdfbf7',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const SidebarItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(2),
  border: 'none',
  '& .MuiListItemIcon-root': {
    minWidth: '40px',
  },
  '& .MuiTypography-root': {
    fontWeight: 'bold',
  },
}));

const HomePage = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false); // State to control Drawer

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen); // Toggles the state to open/close the Drawer
  };

  return (
    <Container maxWidth="lg">
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle} sx={{ margin: 1 }}>
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="temporary"
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          width: 250,
          '& .MuiDrawer-paper': { width: 250, boxSizing: 'border-box' },
        }}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
        >
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
        {/* Example Feature Description */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Featured Tools
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Communication Board:</strong> Share and discover vital information with your neighbors easily.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Marketplace:</strong> Buy and sell goods within your community, promoting sustainability.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Event Booking:</strong> Organize and participate in community events effortlessly.
          </Typography>
          {/* Additional content can go here */}
        </Grid>
      </Grid>

      {/* Footer or additional components */}
    </Container>
  );
};

export default HomePage;