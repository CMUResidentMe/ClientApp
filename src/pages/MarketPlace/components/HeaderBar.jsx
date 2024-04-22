import React, { useState } from 'react';
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

const HeaderBar = () => {
    const navigate = useNavigate();
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [view, setView] = useState('default'); // 'default', 'notifications'
    const [notifications, setNotifications] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);

    const handleNotificationClick = () => {
        if (view === 'notifications') {
            setView('default');
        } else {
            setView('notifications');
            setNotificationCount(0); // Reset notification count after viewing
        }
    };

    const renderContent = () => {
        switch (view) {
            case 'notifications':
                return <NotificationTable notifications={notifications} />;
            default:
                return null; // Return null or other components for the default view
        }
    };

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
                    <MarketPlaceNav />
                    <IconButton color="inherit" aria-label="menu" onClick={() => {
                        setDrawerOpen(!isDrawerOpen)
                    }}>
                        <MenuBookOutlined />
                    </IconButton>
                    <IconButton color="inherit" onClick={handleNotificationClick}>
                        <Badge badgeContent={notificationCount} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <NavBar isDrawerOpen={isDrawerOpen} handleDrawerToggle={() => {
                        setDrawerOpen(!isDrawerOpen);
                    }} />
                </Toolbar>
            </AppBar>
            {renderContent()}
        </React.Fragment>
    );
};

export default HeaderBar;