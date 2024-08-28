import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse, ListItemButton, Card, Typography, Divider } from '@mui/material';
import { Dashboard, ExpandLess, ExpandMore, ExitToApp, AccessTime, Assignment } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { userLogout } from '../services/auth';
import { goToPage } from "../services/pageController";

const EmployeeSidebar = () => {
    const [openAttendance, setOpenAttendance] = useState(false);
    const [openPermission, setOpenPermission] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleAttendanceClick = () => {
        setOpenAttendance(!openAttendance);
    };

    const handlePermissionClick = () => {
        setOpenPermission(!openPermission);
    };

    const onLogout = () => {
        goToPage('/login', 1500);
    };

    const handleLogout = () => {
        userLogout(onLogout);
    }

    const menuItems = [
        { text: 'Dashboard', icon: <Dashboard sx={{ color: 'primary.contrastText' }} />, path: '/employee/dashboard' },
        {
            text: 'Attendance',
            icon: <AccessTime sx={{ color: 'primary.contrastText' }} />,
            subItems: [
                { text: 'Take Attendance', path: '/employee/take-attendance' },
                { text: 'Attendance History', path: '/employee/attendance-history' }
            ]
        },
        {
            text: 'Permission',
            icon: <Assignment sx={{ color: 'primary.contrastText' }} />,
            subItems: [
                { text: 'Application for Permit', path: '/employee/application-for-permit' },
                { text: 'Permission Approval', path: '/employee/permission-approval' },
                { text: 'Permission History', path: '/employee/permission-history' }
            ]
        },
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
                        EAMS
                    </Typography>
                    <Divider sx={{ backgroundColor:'secondary.dark' }} />
                    <List>
                        {menuItems.map((item, index) => (
                            item.subItems ? (
                                <React.Fragment key={index}>
                                    <ListItemButton onClick={item.text === 'Attendance' ? handleAttendanceClick : handlePermissionClick}>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.text} />
                                        {item.text === 'Attendance' ? openAttendance ? <ExpandLess /> : <ExpandMore /> : openPermission ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={item.text === 'Attendance' ? openAttendance : openPermission} timeout="auto" unmountOnExit>
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

export default EmployeeSidebar;
