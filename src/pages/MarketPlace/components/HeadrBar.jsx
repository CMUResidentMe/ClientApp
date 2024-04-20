import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MarketIcon from '../../../assets/market-logo.png';
import {useNavigate} from "react-router-dom";
const HeaderBar = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [authed, setAuthed] = useState(Boolean(localStorage.getItem('token')));
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLogin = () => {
        navigate('/');
    }

    const onLogout = () => {
        localStorage.removeItem('token');
        setAuthed(false);
        navigate('/');
    }

    return (
        <AppBar position="static">
            <Toolbar >
                <img onClick={() => navigate('/marketplace')} className={'me-2'} width={40} src={MarketIcon}/>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Market Place
                </Typography>
                {authed ? (
                    <div>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <Avatar  />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => {
                                navigate(`/marketplace/my-goods`)
                                handleClose();
                            }}>My Products</MenuItem>
                            <MenuItem onClick={() => {
                                navigate(`/marketplace/my-orders`)
                                handleClose();
                            }}>My Orders</MenuItem>
                            <MenuItem onClick={() => {
                                handleClose();
                                onLogout();
                            }}>Log Out</MenuItem>
                        </Menu>
                    </div>
                ) : (
                    <Button color="inherit" onClick={onLogin}>Login</Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default HeaderBar;
