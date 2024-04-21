import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MarketIcon from '../../../assets/market-logo.png';
import {useNavigate} from "react-router-dom";
import MarketPlaceNav from "./MarketPlaceNav.jsx";
import NavBar from "../../../components/NavBar.js";
import {MenuBookOutlined} from "@mui/icons-material";

const HeaderBar = () => {
    const navigate = useNavigate();
    const [isDrawerOpen, setDrawerOpen] = useState(false);
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