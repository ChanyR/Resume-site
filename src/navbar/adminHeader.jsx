import * as React from 'react';
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function AdminHeader() {

    return (
        <Box sx={{ flexGrow: 1 }} >
            <AppBar position="static">
                <Toolbar className='d-flex justify-content-between'>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div className="">
                        <Link to="/home" className='text-white me-3'>My resume</Link>
                        <Link to="/mainAdmin" className='text-white me-3'>All users resume</Link>
                        <Link to="/logout" className='text-white me-3'>Log out</Link>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}