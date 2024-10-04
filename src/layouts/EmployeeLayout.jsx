import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import EmployeeSidebar from "../components/EmployeeSidebar";
import EmployeeAppBar from '../components/EmployeeAppBar';
import { fetchEmployeeByUserLogin } from '../services/employeeService';
import { useState, useEffect } from 'react';

const EmployeeLayout = ({ children, title }) => {
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
                    {children}
                </Container>
            </Box>
        </Container>
    );
}

EmployeeLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default EmployeeLayout;