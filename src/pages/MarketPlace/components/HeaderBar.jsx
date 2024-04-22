import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MarketIcon from '../../../assets/market-logo.png';
import {useNavigate} from "react-router-dom";
import MarketPlaceNav from "./MarketPlaceNav.jsx";
import NavBar from "../../../components/NavBar.js";
import { MenuBookOutlined } from "@mui/icons-material";
import NotificationTable from '../../Notification/NotificationTable.jsx';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import { Box } from '@mui/system';

const HeaderBar = () => {
    const navigate = useNavigate();
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [isNotificationOpen, setNotificationOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);

    const handleNotificationClick = () => {
        setNotificationOpen(!isNotificationOpen);
        if (isNotificationOpen) {
            setNotificationCount(0); // Reset notification count after viewing
        }
    };

    useEffect(() => {
        if (isNotificationOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'visible';
        }

        return () => {
            document.body.style.overflow = 'visible';
        };
    }, [isNotificationOpen]);

    return (
        <React.Fragment>
            <AppBar position="static" sx={{ backgroundColor: '#d2b48c' }}>
            <Toolbar>
                <img onClick={() => navigate('/marketplace')} className={'me-2'} width={40} src={MarketIcon} />
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        flexGrow: 1,
                        fontFamily: "'Comic Sans MS', 'Arial Rounded MT Bold', sans-serif",
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        color: '#8B4513',
                        letterSpacing: '0.1em'
                    }}
                >
                    ResidentMe - MarketPlace
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton color="inherit" onClick={handleNotificationClick}>
                        <Badge badgeContent={notificationCount} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <MarketPlaceNav sx={{ marginRight: 60 }} />
                    <IconButton color="inherit" aria-label="menu" sx={{ marginLeft: 1, marginRight: 2 }} onClick={() => setDrawerOpen(!isDrawerOpen)}>
                        <MenuBookOutlined />
                    </IconButton>
                    <NavBar isDrawerOpen={isDrawerOpen} handleDrawerToggle={() => setDrawerOpen(!isDrawerOpen)} />
                </Box>
            </Toolbar>
            </AppBar>
            {isNotificationOpen && (
                <Box sx={{
                    width: '100%',
                    maxWidth: '1500px',
                    marginTop: '65px', 
                    backgroundColor: "white",
                    zIndex: 1200,
                    position: 'fixed', 
                    left: 0,
                    top: 0,  
                    height: 'calc(100vh - 64px)',  
                    minHeight: '100%', 
                    overflow: 'auto'
                }}>
                    <NotificationTable notifications={notifications} />
                </Box>
            )}
        </React.Fragment>
    );
};

export default HeaderBar;