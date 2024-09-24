import { Dashboard, ExitToApp, ErrorOutline, Group } from '@mui/icons-material';
import { userLogout } from '../services/auth';
import { goToPage } from "../services/pageController";
import SidebarLayout from '../layouts/SidebarLayout';

const SuperAdminSidebar = () => {
    const onLogout = () => {
        goToPage('/login', 1500);
    };

    const handleLogout = () => {
        userLogout(onLogout);
    }

    const menuItems = [
        { text: 'Dashboard', icon: <Dashboard sx={{ color: 'primary.contrastText' }} />, path: '/super-admin/dashboard' },
        { text: 'Admin Management', icon: <Group sx={{ color: 'primary.contrastText' }} />, path: '/super-admin/admin-management' },
        { text: 'Error Log', icon: <ErrorOutline sx={{ color: 'primary.contrastText' }} />, path: '/super-admin/error-log' },
        { text: 'Logout', icon: <ExitToApp sx={{ color: 'primary.contrastText' }} />, action: handleLogout }
    ];

    return <SidebarLayout menuItems={menuItems} title="Super Admin" />;
};

export default SuperAdminSidebar;
