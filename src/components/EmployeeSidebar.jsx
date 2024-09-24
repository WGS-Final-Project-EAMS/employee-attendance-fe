import { Dashboard, AccessTime, Assignment } from '@mui/icons-material';
import SidebarLayout from '../layouts/SidebarLayout';

const EmployeeSidebar = ({open}) => {

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
    ];

    return <SidebarLayout menuItems={menuItems} title="Employee" open={open} />;
};

export default EmployeeSidebar;
