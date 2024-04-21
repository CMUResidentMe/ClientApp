import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MarketIcon from '../../../assets/market-logo.png';
import {useNavigate} from "react-router-dom";
import MarketPlaceNav from "./MarketPlaceNav.jsx";
import NavBar from "../../../components/NavBar.js";
import {MenuBookOutlined} from "@mui/icons-material";
import { ArrowBack } from '@mui/icons-material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationTable from '../../Notification/NotificationTable.jsx';
import useNotificationListener from '../../../notification/NotificationListener.js';
import { socketManager } from "../../../notification/socketManager.js"
import styled from '@emotion/styled';

const HeaderBar = () => {
    const [view, setView] = useState('marketplace');
    const [notifications, setNotifications] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);
    const [checked, setChecked] = useState(true);
    const navigate = useNavigate();
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        socketManager.connect(localStorage.getItem("token"));
      }, []);
    
      useNotificationListener(event => {
        console.log("Received notification:", event);
        setNotifications(prevNotifications => [...prevNotifications, event]);
        setNotificationCount(prevCount => prevCount + 1);
      });
    
      const handleDrawerToggle = () => {
        setDrawerOpen(!isDrawerOpen);
      };
    
      const handleCardClick = (path) => {
        navigate(path);
      };
    
      const workorderUpdateCB = (event) => {
        console.log("Received notification:", event);
        setNotifications(prevNotifications => [...prevNotifications, event]);
        setNotificationCount(prevCount => prevCount + 1);
      };
    
      useNotificationListener(workorderUpdateCB);
    
      const handleNotificationClick = () => {
        setView('notifications');
        setNotificationCount(0);
      };
    
      const BackButtonContainer = styled.div`
      width: 100%;
      display: flex;
      justify-content: flex-start;
      position: relative;
      z-index: 2;
      padding-top: 1rem;
      padding-left: 10rem;
    `;
    
      const NotificationContainer = styled.div`
        padding-left: 8rem;
      `;
    
      socketManager.connect(localStorage.getItem("token"));

    return (
        <AppBar position="static" sx={{ backgroundColor: '#d2b48c' }}>
            <Toolbar>
                <img onClick={() => navigate('/marketplace')} className={'me-2'} width={40} src={MarketIcon}/>
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
                <NavBar isDrawerOpen={isDrawerOpen} handleDrawerToggle={() => {
                    setDrawerOpen(!isDrawerOpen);
                }}/>
            </Toolbar>
        </AppBar>
    );
};

export default HeaderBar;