import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import EmployeeSidebar from "../components/EmployeeSidebar";
import EmployeeAppBar from '../components/EmployeeAppBar';
import { fetchEmployeeByUserLogin } from '../services/employeeService';
import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const EmployeeLayout = () => {
    const location = useLocation();

    const [title, setTitle] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [username, setUsername] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    // const username = "Admin User"; // Can be dynamic based on auth

    const loadUser = async () => {
        const employee = await fetchEmployeeByUserLogin();
        setUsername(employee.user?.username);
        setProfilePicture(employee.user?.profile_picture_url);
    }

    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        loadUser();
    }, []);

    // Effect to update title based on route
    useEffect(() => {
        switch (location.pathname) {
        case '/employee':
            setTitle('Admin Management');
            break;
        case '/employee/dashboard':
            setTitle('Dashboard Admin');
            break;
        case '/employee/take-attendance':
            setTitle('Attendance Tracking');
            break;
        case '/employee/attendance-history':
            setTitle('Attendance History');
            break;
        case '/employee/application-for-permit':
            setTitle('Leave Request');
            break;
        case '/employee/permission-approval':
            setTitle('Leave Request Approval');
            break;
        case '/employee/permission-history':
            setTitle('Leave Request History');
            break;
        case '/employee/change-password':
            setTitle('Change Password');
            break;
        default:
            setTitle('Employee Panel');
        }
    }, [location.pathname]);

    return (
        <Container component="main" disableGutters maxWidth="xl" sx={{ display: 'flex', flexGrow: 1 }}>
            <EmployeeSidebar open={sidebarOpen} />
            {/* Main Content */}
            <Box
                sx={{
                    flexGrow: 1, // Fills the remaining space
                    transition: 'margin 0.3s ease', // Smooth transition
                    marginLeft: sidebarOpen ? '0px' : '-256px', // Adjust based on sidebar state
                    width: sidebarOpen ? `calc(100% - 256px)` : '100%', // Adjust width when sidebar is hidden
                }}
            >
                <EmployeeAppBar handleSidebarToggle={handleSidebarToggle} username={username} avatarUrl={profilePicture} title={title} />
                <Container maxWidth="xl" disableGutters sx={{ p: 2, px: 4, mt: 4 }}>
                    {/* <Breadcrumbs /> */}
                    <Outlet />
                </Container>
            </Box>
        </Container>
    );
}

export default EmployeeLayout;