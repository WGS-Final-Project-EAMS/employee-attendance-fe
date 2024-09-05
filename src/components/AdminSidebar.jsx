import { Dashboard, ExitToApp, Group, CheckCircle } from '@mui/icons-material';
import { userLogout } from '../services/auth';
import { goToPage } from "../services/pageController";
import SidebarLayout from '../layouts/SidebarLayout';

const AdminSidebar = () => {
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

    return <SidebarLayout menuItems={menuItems} title="Admin" />;
};

export default AdminSidebar;