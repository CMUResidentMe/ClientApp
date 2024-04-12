import React from 'react';
import { Drawer, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CottageIcon from '@mui/icons-material/Cottage.js';
import HomeIcon from '@mui/icons-material/Home.js';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart.js';
import BuildIcon from '@mui/icons-material/Build.js';
import EventIcon from '@mui/icons-material/Event.js';
import NotificationsIcon from '@mui/icons-material/Notifications.js';
import logo from '../assets/logo.png';
import LogoutIcon from '@mui/icons-material/Logout.js';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isDrawerOpen, handleDrawerToggle }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/');
  };

  // const handleNavItemClick = (path) => {
  //   const isAuthenticated = true; 

  //   if (isAuthenticated) {
  //     navigate(path);
  //   } else {
  //     navigate('/login');
  //   }
  // };

  const handleNavItemClick = (path) => {
    if (path === '/logout') {
      handleLogout();
    } else {
      navigate(path);
    }
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
            <ListItem button onClick={() => handleNavItemClick('/home')}>
              <ListItemIcon>
                <CottageIcon />
              </ListItemIcon>
              <ListItemText primary="Home Page" />
            </ListItem>
            <ListItem button onClick={() => handleNavItemClick('/logout')}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
