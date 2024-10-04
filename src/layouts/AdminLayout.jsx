import { Container, Box } from '@mui/material';
import AdminSidebar from "../components/AdminSidebar";
import AdminAppBar from "../components/AdminAppBar";
import Breadcrumbs from "../components/elements/Breadcrumbs";
import { getAdminByUserId } from '../services/adminService';
import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const AdminLayout = () => {
    const location = useLocation();

    const [title, setTitle] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [username, setUsername] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    // const username = "Admin User"; // Can be dynamic based on auth

    const loadUser = async () => {
        const admin = await getAdminByUserId();
        setUsername(admin.username);
        setProfilePicture(admin.profile_picture_url);
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
        case '/admin':
            setTitle('Admin Management');
            break;
        case '/admin/dashboard':
            setTitle('Dashboard Admin');
            break;
        case '/admin/employee-management':
            setTitle('Employee Management');
            break;
        case '/admin/settings/office':
            setTitle('Office Settings');
            break;
        case '/admin/attendance-records':
            setTitle('Attendance Recap');
            break;
        case '/admin/change-password':
            setTitle('Change Password');
            break;
        default:
            setTitle('Admin Panel');
        }
    }, [location.pathname]);

    return (
        <>
            <Container component="main" disableGutters maxWidth="xl" sx={{ display: 'flex', flexGrow: 1 }}>
                <AdminSidebar open={sidebarOpen} />
                <Box
                    sx={{
                        flexGrow: 1, // Fills the remaining space
                        transition: 'margin 0.3s ease', // Smooth transition
                        marginLeft: sidebarOpen ? '0px' : '-256px', // Adjust based on sidebar state
                        width: sidebarOpen ? `calc(100% - 256px)` : '100%', // Adjust width when sidebar is hidden
                    }}
                >
                    <AdminAppBar handleSidebarToggle={handleSidebarToggle} username={username} avatarUrl={profilePicture} title={title} />
                    <Container maxWidth="xl" disableGutters sx={{ p: 2, px: 4, mt: 4 }}>
                        <Breadcrumbs />
                        <Outlet />
                    </Container>
                </Box>
            </Container>
        </>
    );
};

export default AdminLayout;