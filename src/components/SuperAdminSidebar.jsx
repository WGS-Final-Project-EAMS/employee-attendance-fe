import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse, ListItemButton, Card, Typography, Divider } from '@mui/material';
import { Dashboard, ExpandLess, ExpandMore, ExitToApp, ErrorOutline, Group } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { userLogout } from '../services/auth';
import { goToPage } from "../services/pageController";

const SuperAdminSidebar = () => {
    const [openAdmin, setOpenAdmin] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleAdminManagementClick = () => {
        setOpenAdmin(!openAdmin);
    };

    const onLogout = () => {
        goToPage('/login', 1500);
    };

    const handleLogout = () => {
        userLogout(onLogout);
    }

    const menuItems = [
        { text: 'Dashboard', icon: <Dashboard sx={{ color: 'primary.contrastText' }} />, path: '/super-admin/dashboard' },
        {
            text: 'Admin Management',
            icon: <Group sx={{ color: 'primary.contrastText' }} />,
            subItems: [
                { text: 'Active Admin', path: '/super-admin/admin-management/active' },
                { text: 'Non-active admin', path: '/super-admin/admin-management/non-active' }
            ]
        },
        { text: 'Error Log', icon: <ErrorOutline sx={{ color: 'primary.contrastText' }} />, path: '/super-admin/error-log' },
        { text: 'Logout', icon: <ExitToApp sx={{ color: 'primary.contrastText' }} />, action: handleLogout }
    ];

    return (
        <>
            <Drawer
                variant="permanent"
                sx={{
                    width: 240,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' }
                }}
            >
                <Card sx={{ minHeight: '100vh', backgroundColor: 'primary.dark', color: 'primary.contrastText' }}>
                    <Typography component="h1" variant="h4" sx={{ m:2 }}>
                        Ngabsen
                    </Typography>
                    <Divider sx={{ backgroundColor:'secondary.dark' }} />
                    <List>
                        {menuItems.map((item, index) => (
                            item.subItems ? (
                                <React.Fragment key={index}>
                                    <ListItemButton onClick={handleAdminManagementClick}>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.text} />
                                        {openAdmin ? <ExpandLess /> : <ExpandMore /> }
                                    </ListItemButton>
                                    <Collapse in={openAdmin} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {item.subItems.map((subItem, subIndex) => {
                                                const isActive = location.pathname === subItem.path; // Mengecek apakah path ini aktif
                                                return (
                                                    <ListItemButton
                                                        key={subIndex}
                                                        sx={{ pl: 4, backgroundColor: isActive ? 'primary.main' : 'inherit' }}
                                                        onClick={() => navigate(subItem.path)}
                                                    >
                                                        <ListItemText primary={subItem.text} />
                                                    </ListItemButton>
                                                );
                                            })}
                                        </List>
                                    </Collapse>
                                </React.Fragment>
                            ) : (
                                <ListItem
                                    button
                                    key={index}
                                    onClick={item.action ? item.action : () => navigate(item.path)}
                                    sx={{ backgroundColor: location.pathname === item.path ? 'primary.main' : 'inherit' }} // Styling untuk item aktif
                                >
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItem>
                            )
                        ))}
                    </List>
                </Card>
            </Drawer>
        </>
    );
};

export default SuperAdminSidebar;
