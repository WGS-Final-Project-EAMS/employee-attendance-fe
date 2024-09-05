import { Dashboard, AccessTime, Assignment, ExitToApp } from '@mui/icons-material';
import { userLogout } from '../services/auth';
import { goToPage } from "../services/pageController";
import SidebarLayout from '../layouts/SidebarLayout';

const EmployeeSidebar = () => {
    const onLogout = () => {
        goToPage('/login', 1500);
    };

    const handleLogout = () => {
        userLogout(onLogout);
    };

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

    return <SidebarLayout menuItems={menuItems} title="Employee" />;
};

export default EmployeeSidebar;
