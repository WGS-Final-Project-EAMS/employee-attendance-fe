import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = ({children}) => {
    return (
        <Container component="main" disableGutters maxWidth="xl" sx={{ display: 'flex', flexGrow: 1, padding: '16px' }}>
            <AdminSidebar />
            {children}
        </Container>
    );
}

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminLayout;