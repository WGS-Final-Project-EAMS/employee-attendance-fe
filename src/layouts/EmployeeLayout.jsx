import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import EmployeeSidebar from "../components/EmployeeSidebar";

const EmployeeLayout = ({children}) => {
    return (
        <Container component="main" disableGutters maxWidth="xl" sx={{ display: 'flex', flexGrow: 1, padding: '16px' }}>
            <EmployeeSidebar />
            {children}
        </Container>
    );
}

EmployeeLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default EmployeeLayout;