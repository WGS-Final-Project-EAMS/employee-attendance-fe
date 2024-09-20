import PropTypes from 'prop-types';
import { Container, Box } from '@mui/material';
import AdminSidebar from "../components/AdminSidebar";
import AdminAppBar from "../components/AdminAppBar";
import { getUserById } from '../services/auth';
import { getAdminByUserId } from '../services/adminService';
import { useState, useEffect } from 'react';

const AdminLayout = ({ children, title }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [username, setUsername] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    // const username = "Admin User"; // Can be dynamic based on auth

    const loadUser = async () => {
        const admin = await getAdminByUserId();
        setUsername(admin.user.username);
        setProfilePicture(admin.profile_picture_url);
    }

    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <>
            <Container component="main" disableGutters maxWidth="xl" sx={{ display: 'flex', flexGrow: 1 }}>
                <AdminSidebar open={sidebarOpen} />
                {/* <Container maxWidth="xl" disableGutters sx={{ display: 'flex', flexDirection:'column', p:0, justifyContent:'start', alignItems:'start', gap:0 }}>
                    <AdminAppBar handleSidebarToggle={handleSidebarToggle} username={username} title={title} />
                    {children}
                </Container> */}
                {/* Main Content */}
                <Box
                    sx={{
                        flexGrow: 1, // Fills the remaining space
                        transition: 'margin 0.3s ease', // Smooth transition
                        marginLeft: sidebarOpen ? '0px' : '-256px', // Adjust based on sidebar state
                        width: sidebarOpen ? `calc(100% - 256px)` : '100%', // Adjust width when sidebar is hidden
                    }}
                >
                    <AdminAppBar handleSidebarToggle={handleSidebarToggle} username={username} avatarUrl={profilePicture} title={title} />
                    <Container maxWidth="xl" disableGutters sx={{ p: 2, px:4, mt:4 }}>
                        {children}
                    </Container>
                </Box>
            </Container>
        </>
    );
};

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminLayout;