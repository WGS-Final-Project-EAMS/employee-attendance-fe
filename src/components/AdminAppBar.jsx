import { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Box, Divider, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { ExitToApp, Person } from '@mui/icons-material';
import AvatarComponent from './elements/UserAvatar';
import { goToPage } from '../services/pageController';
import { userLogout } from '../services/auth';
import { useNavigate } from 'react-router-dom';

const AdminAppBar = ({ handleSidebarToggle, username, avatarUrl, title }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifCount, setNotifCount] = useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
    navigate('/admin/change-password');
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
            // onClick={handleSidebarToggle}
          >
            <Badge color="error" badgeContent={notifCount}>
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Typography variant="subtitle1">
            {username}
          </Typography>
          <IconButton onClick={handleMenu} color="inherit">
            <AvatarComponent url={ avatarUrl } size={36} />
          </IconButton>
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

export default AdminAppBar;