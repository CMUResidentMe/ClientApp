import {Avatar, Button, IconButton, Menu, MenuItem} from "@mui/material";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";


export default function MarketPlaceNav() {
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
        <>

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
                            navigate(`/marketplace/playground`)
                            handleClose();
                        }
                        }>MarketPlace</MenuItem>
                        <MenuItem onClick={() => {
                            navigate(`/marketplace/my-goods`)
                            handleClose();
                        }}>My Products</MenuItem>
                        <MenuItem onClick={() => {
                            navigate(`/marketplace/my-orders`)
                            handleClose();
                        }}>My Orders</MenuItem>
                        <MenuItem onClick={() => {
                            navigate(`/marketplace/my-sold`)
                            handleClose();
                        }}>My Sold</MenuItem>
                        <MenuItem onClick={() => {  
                            navigate(`/marketplace`)
                            handleClose();
                        }
                        }>About MarketPlace</MenuItem>
                        {/* <MenuItem onClick={() => {
                            handleClose();
                            onLogout();
                        }}>Log Out</MenuItem> */}
                    </Menu>
                </div>
            ) : (
                <Button color="inherit" onClick={onLogin}>Login</Button>
            )}
        </>
    )

}