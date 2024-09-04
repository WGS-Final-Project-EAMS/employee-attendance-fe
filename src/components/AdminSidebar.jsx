import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse, ListItemButton, Card, Typography, Divider } from '@mui/material';
import { Dashboard, ExpandLess, ExpandMore, ExitToApp, Group, CheckCircle } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { userLogout } from '../services/auth';
import { goToPage } from "../services/pageController";

const AdminSidebar = () => {
    const [openEmployeeManagement, setOpenEmployeeManagement] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleUserManagementClick = () => {
        setOpenEmployeeManagement(!openEmployeeManagement);
    };

    const onLogout = () => {
        goToPage('/login', 1500);
    };

    const handleLogout = () => {
        userLogout(onLogout);
    }

    const menuItems = [
        { text: 'Dashboard', icon: <Dashboard sx={{ color: 'primary.contrastText' }} />, path: '/admin/dashboard' },
        {
            text: 'Employee Management',
            icon: <Group sx={{ color: 'primary.contrastText' }} />,
            subItems: [
                { text: 'Active Employees', path: '/admin/employee-management/active' },
                { text: 'Inactive Employees', path: '/admin/employee-management/inactive' }
            ]
        },
        { text: 'Attendance Records', icon: <CheckCircle sx={{ color: 'primary.contrastText' }} />, path: '/admin/attendance-records' },
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
                                    <ListItemButton onClick={handleUserManagementClick}>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.text} />
                                        {openEmployeeManagement ? <ExpandLess /> : <ExpandMore /> }
                                    </ListItemButton>
                                    <Collapse in={openEmployeeManagement} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {item.subItems.map((subItem, subIndex) => {
                                                const isActive = location.pathname === subItem.path;
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
                                    sx={{ backgroundColor: location.pathname === item.path ? 'primary.main' : 'inherit' }}
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

export default AdminSidebar;