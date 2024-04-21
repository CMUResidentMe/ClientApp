import React from 'react';
import { Drawer, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { LogoutOutlined, CottageOutlined, HomeOutlined, ShoppingCartOutlined, BuildOutlined, EventOutlined, NotificationsOutlined, AccountCircleOutlined} from '@mui/icons-material';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isDrawerOpen, handleDrawerToggle }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/');
  };

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
          <ListItem onClick={() => handleNavItemClick('/login')}>
              <ListItemIcon>
                <AccountCircleOutlined />
              </ListItemIcon>
              <ListItemText primary="User Login" />
            </ListItem>
            <ListItem onClick={() => handleNavItemClick('/community-board')}>
              <ListItemIcon>
                <HomeOutlined />
              </ListItemIcon>
              <ListItemText primary="Communication Board" />
            </ListItem>
            <ListItem onClick={() => handleNavItemClick('/marketplace')}>
              <ListItemIcon>
                <ShoppingCartOutlined />
              </ListItemIcon>
              <ListItemText primary="Marketplace" />
            </ListItem>
            <ListItem onClick={() => handleNavItemClick('/work-order')}>
              <ListItemIcon>
                <BuildOutlined />
              </ListItemIcon>
              <ListItemText primary="Work Order" />
            </ListItem>
            <ListItem onClick={() => handleNavItemClick('/booking')}>
              <ListItemIcon>
                <EventOutlined />
              </ListItemIcon>
              <ListItemText primary="Booking" />
            </ListItem>
            <ListItem onClick={() => handleNavItemClick('/home')}>
              <ListItemIcon>
                <CottageOutlined />
              </ListItemIcon>
              <ListItemText primary="Home Page" />
            </ListItem>
            <ListItem onClick={() => handleNavItemClick('/logout')}>
              <ListItemIcon>
                <LogoutOutlined />
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
