import React, { useState } from 'react';
import { Drawer, List, ListItemIcon, ListItemText, Collapse, ListItemButton, Box, Typography, } from '@mui/material';
import { ExpandLess, ExpandMore, PersonPinCircle } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const SidebarLayout = ({ menuItems, title, open = true }) => {
    const [openMenus, setOpenMenus] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

    const handleToggle = (text) => {
        setOpenMenus(prev => ({ ...prev, [text]: !prev[text] }));
    };

    return (
        <Drawer
            variant="persistent"
            sx={{
                width: 256,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 256, boxSizing: 'border-box' },
                border:0
            }}
            open={open}
        >
            <Box sx={{
                minHeight: '100vh',
                backgroundColor: 'primary.dark', color: 'primary.contrastText',
            }}>
                <Typography component="h1" variant="h4" sx={{ mx:1, my: 2, pt:2, display:'flex', alignItems:'center', gap:1 }}>
                    <PersonPinCircle color='error' sx={{ fontSize: "40px" }} />
                    NGABSEN
                </Typography>
                {/* <Divider sx={{ backgroundColor: 'secondary.light' }} /> */}
                <List>
                    {menuItems.map((item, index) => (
                        item.subItems ? (
                            <React.Fragment key={index}>
                                <ListItemButton onClick={() => handleToggle(item.text)}>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                    {openMenus[item.text] ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={openMenus[item.text]} timeout="auto" unmountOnExit>
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
                            <ListItemButton
                                key={index}
                                onClick={item.action ? item.action : () => navigate(item.path)}
                                sx={{ backgroundColor: location.pathname === item.path ? 'primary.main' : 'inherit' }}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        )
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};

export default SidebarLayout;
