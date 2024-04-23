import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ResidentMeLogo from "../../../assets/logo.png";
import {useNavigate} from "react-router-dom";
import MarketPlaceNav from "./MarketPlaceNav.jsx";
import NavBar from "../../../components/NavBar.js";
import { MenuBookOutlined } from "@mui/icons-material";
import NotificationTable from '../../Notification/NotificationTable.jsx';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import { Box } from '@mui/system';
import useNotificationListener from "../../../notification/NotificationListener.js";
import HomeIcon from '@mui/icons-material/Home'; 
import styled from "@emotion/styled";

const ToolBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 20px;
  padding: 20px;
  padding-left: 2%;
  padding-right: 2%;
  height: 100px;
  background-color: #f2efea;
  color: #746352;
  z-index: 1100;
`;


const HeaderBar = () => {
    const navigate = useNavigate();
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [isNotificationOpen, setNotificationOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);
    const currentUserPrivilege = localStorage.getItem("privilege");

    const handleBackManager = () => {
        navigate("/manager-home");
    };
    const handleNotificationClick = () => {
        setNotificationOpen(!isNotificationOpen);
        if (isNotificationOpen) {
            setNotificationCount(0); // Reset notification count after viewing
        }
    };

    const receiveMessages = (event) => {
        console.log("Received notification:", event);
        setNotifications(prevNotifications => [event, ...prevNotifications]);
        setNotificationCount(prevCount => prevCount + 1);
    };

    useNotificationListener(receiveMessages);

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
                <ToolBar>
                    <img onClick={() => navigate('/marketplace')} className={'me-2'} width={80} src={ResidentMeLogo} />
                    <Typography
                        style={{
                            fontSize: '1.5rem', // Larger size
                            fontWeight: 'bold'  // Bolder text
                        }}
                    >
                        MarketPlace
                    </Typography>

                    {currentUserPrivilege === "resident" && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton onClick={handleNotificationClick}>
                                <Badge badgeContent={notificationCount} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <MarketPlaceNav sx={{ marginRight: 60 }} />
                            <IconButton aria-label="menu" sx={{ marginLeft: 1, marginRight: 2 }} onClick={() => setDrawerOpen(!isDrawerOpen)}>
                                <MenuIcon />
                            </IconButton>
                            <NavBar isDrawerOpen={isDrawerOpen} handleDrawerToggle={() => setDrawerOpen(!isDrawerOpen)} />
                        </Box>
                    )}
                    {currentUserPrivilege === "manager" && (
                        <IconButton onClick={handleBackManager}>
                            <HomeIcon />
                        </IconButton>
                    )}
                </ToolBar>
            {isNotificationOpen && (
                <Box sx={{
                    width: '100%',
                    maxWidth: '1500px',
                    marginTop: '100px', 
                    backgroundColor: "white",
                    zIndex: 1200,
                    position: 'fixed', 
                    left: 0,
                    top: 0,  
                    height: 'calc(100vh - 100px)',  
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