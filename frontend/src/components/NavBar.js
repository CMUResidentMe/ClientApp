import React from 'react';
import { Drawer, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CottageIcon from '@mui/icons-material/Cottage';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BuildIcon from '@mui/icons-material/Build';
import EventIcon from '@mui/icons-material/Event';
import NotificationsIcon from '@mui/icons-material/Notifications';
import logo from '../assets/logo.PNG';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isDrawerOpen, handleDrawerToggle }) => {
  const navigate = useNavigate();

  // const handleNavItemClick = (path) => {
  //   const isAuthenticated = true; 

  //   if (isAuthenticated) {
  //     navigate(path);
  //   } else {
  //     navigate('/login');
  //   }
  // };

  const handleNavItemClick = (path) => {
      navigate(path);
  };
  return (
    <>
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
          <ListItem button onClick={() => handleNavItemClick('/login')}>
              <ListItemIcon>
                <ProfileIcon />
              </ListItemIcon>
              <ListItemText primary="User" />
            </ListItem>
            <ListItem button onClick={() => handleNavItemClick('/community-board')}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Communication Board" />
            </ListItem>
            <ListItem button onClick={() => handleNavItemClick('/marketplace')}>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Marketplace" />
            </ListItem>
            <ListItem button onClick={() => handleNavItemClick('/work-order')}>
              <ListItemIcon>
                <BuildIcon />
              </ListItemIcon>
              <ListItemText primary="Work Order" />
            </ListItem>
            <ListItem button onClick={() => handleNavItemClick('/booking')}>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Booking" />
            </ListItem>
            <ListItem button onClick={() => handleNavItemClick('/notification')}>
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText primary="Notifications" />
            </ListItem>
            <ListItem button onClick={() => handleNavItemClick('/')}>
              <ListItemIcon>
                <CottageIcon />
              </ListItemIcon>
              <ListItemText primary="Home Page" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
