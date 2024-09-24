import { Dashboard, ErrorOutline, Group } from '@mui/icons-material';
import SidebarLayout from '../layouts/SidebarLayout';

const SuperAdminSidebar = ({ open }) => {

    const menuItems = [
        { text: 'Dashboard', icon: <Dashboard sx={{ color: 'primary.contrastText' }} />, path: '/super-admin/dashboard' },
        { text: 'Admin Management', icon: <Group sx={{ color: 'primary.contrastText' }} />, path: '/super-admin/admin-management' },
        { text: 'Error Log', icon: <ErrorOutline sx={{ color: 'primary.contrastText' }} />, path: '/super-admin/error-log' },
    ];

    return <SidebarLayout menuItems={menuItems} title="Super Admin" open={open} />;
};

export default SuperAdminSidebar;
