import Container from '@mui/material/Container';
import SuperAdminSidebar from "../components/SuperAdminSidebar";
import { Box } from '@mui/material';
import AdminAppBar from '../components/AdminAppBar';
import { getAdminByUserId } from '../services/adminService';
import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const SuperAdminLayout = () => {
    const location = useLocation();

    const [title, setTitle] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [username, setUsername] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);

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
        case '/super-admin':
            setTitle('Admin Management');
            break;
        case '/super-admin/dashboard':
            setTitle('Dashboard Super Admin');
            break;
        case '/super-admin/admin-management':
            setTitle('Admin Management');
            break;
        case '/super-admin/error-log':
            setTitle('Error Logs');
            break;
        case '/super-admin/change-password':
            setTitle('Change Password');
            break;
        default:
            setTitle('Super Admin Panel');
        }
    }, [location.pathname]);

    return (
        <Container component="main" disableGutters maxWidth="xl" sx={{ display: 'flex', flexGrow: 1 }}>
            <SuperAdminSidebar open={sidebarOpen} />
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
                    {/* <Breadcrumbs /> */}
                    {/* {children} */}
                    <Outlet />
                </Container>
            </Box>
        </Container>
    );
}

// SuperAdminLayout.propTypes = {
//     children: PropTypes.node.isRequired,
// };

export default SuperAdminLayout;