import { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Box, Divider, Badge, ListItemText, ListItem, Grid } from '@mui/material';
import { Done, NotificationsActive, Notifications, NotificationsNone  } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { ExitToApp, Person } from '@mui/icons-material';
import AvatarComponent from './elements/UserAvatar';
import { goToPage } from '../services/pageController';
import { userLogout } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { fetchNotification, updateNotification } from '../services/notificationService';

const EmployeeAppBar = ({ handleSidebarToggle, username, avatarUrl, title }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [notifCount, setNotifCount] = useState(null);
  const navigate = useNavigate();

  const loadNotification = async () => {
    try {
      const data = await fetchNotification();

      setNotifications(data.notification);
      setNotifCount(data.unreadCount);
    } catch (error) {
      console.error("Error fetching notification:", error);
    }
  }

  const updateNotificationStatus = async () => {
    try {
      const data = await updateNotification();

      console.log(data);
      setNotifCount(null);
    } catch (error) {
      console.error("Error fetching notification:", error);
    }
  }

  useEffect(() => {
    loadNotification();
  }, [notifCount]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotifMenu = (event) => {
    updateNotificationStatus();
    setNotifAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNotifAnchorEl(null);
  };

  const onLogout = () => {
    goToPage('/login', 1500);
  };

  const handleLogout = () => {
    handleClose();
    userLogout(onLogout);
  };

  const handleProfile = () => {
    handleClose();
    // Redirect to profile page
    navigate('/employee/change-password');
  };

  return (
    <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor:'white', color:'secondary.dark' }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleSidebarToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {title ? title : ''}
        </Typography>
        <Box display="flex" gap={1} alignItems="center">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleNotifMenu}
          >
            <Badge color="error" badgeContent={notifCount} max={9}>
              {notifAnchorEl === null ? <NotificationsNone /> : <Notifications />}
            </Badge>
          </IconButton>
          <Typography variant="subtitle1">
            {username}
          </Typography>
          <IconButton onClick={handleMenu} color="inherit">
            <AvatarComponent url={ avatarUrl } size={36} />
          </IconButton>
          <Menu
            anchorEl={notifAnchorEl}
            open={Boolean(notifAnchorEl)}
            onClose={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  // '& .MuiAvatar-root': {
                  //   width: 32,
                  //   height: 32,
                  //   ml: -0.5,
                  //   mr: 1,
                  // },
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              },
            }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {notifications.length === 0 ? (
              <MenuItem disabled>No notifications</MenuItem>
            ) : (
              notifications.map((notif) => (
                <MenuItem key={notif.notification_id} onClick={handleClose}>
                  <ListItemText
                    primary={notif.title}
                    secondary={notif.message}
                  />
                </MenuItem>
              ))
            )}
          </Menu>
        </Box>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleProfile} sx={{ color: 'secondary.dark' }}><Person sx={{ mr: 1 }} /> Profile</MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem onClick={handleLogout} sx={{ color:'error.main' }}><ExitToApp sx={{ mr:1 }} /> Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default EmployeeAppBar;