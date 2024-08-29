import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import SuperAdminSidebar from "../components/SuperAdminSidebar";

const SuperAdminLayout = ({children}) => {
    return (
        <Container component="main" disableGutters maxWidth="xl" sx={{ display: 'flex', flexGrow: 1, padding: '16px' }}>
            <SuperAdminSidebar />
            {children}
        </Container>
    );
}

SuperAdminLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default SuperAdminLayout;