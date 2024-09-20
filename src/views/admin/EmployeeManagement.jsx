import { useState, useEffect } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { PersonAddAlt } from '@mui/icons-material';
import AdminLayout from "../../layouts/AdminLayout";
import { fetchEmployee } from "../../services/employeeService";
import LoadingIndicator from "../../components/LoadingIndicator";
import ErrorMessage from "../../components/ErrorMessage";
import EmployeeTable from "../../components/EmployeeTable";
import ModalElement from "../../components/elements/ModalElement";
import { ModalActionEmployee } from "../../components/elements/ModalActionContent";

const EmployeeManagement = () => {
    const [employee, setEmployee] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const title = "Employee Management";

    const loadEmployee = async () => {
        try {
            const data = await fetchEmployee(); // Get attendance history data
            
            setEmployee(data);
        } catch (error) {
            setError("Failed to fetch attendance history.");
            console.error("Error fetching attendance history:", error);
        } finally {
            setLoading(false); // Loading false if fetching successful
        }
    }

    useEffect(() => {
        loadEmployee();
    }, []);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        loadEmployee();
    };

    return (
        <>
            <AdminLayout title={title}>
                <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography component="h1" variant="h4" color="primary.dark">
                        {title}
                    </Typography>
                    {/* Main Content */}
                    <Box sx={{ my: 4, mt: 4 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ mb: 4 }}
                            onClick={handleOpenModal}
                        >
                            <PersonAddAlt sx={{ mr: 2 }} />
                            <Typography component="h1" variant="body1">Create New Employee</Typography>
                        </Button>
                        {loading ? (
                            <LoadingIndicator />
                        ) : error ? (
                            <ErrorMessage message={error} />
                        ) : employee.length === 0 ? (
                            <Typography>No employee found.</Typography>
                        ) : (
                            <EmployeeTable employee={employee} loadEmployee={loadEmployee} />
                        )}
                    </Box>
                </Container>
                {/* Modal */}
                <ModalElement openModal={openModal} handleCloseModal={handleCloseModal} modalTitle="Create New Employee"
                    renderModalContent={
                        () => <ModalActionEmployee modalType="create" handleOpenModal={handleOpenModal} />
                    }/>
            </AdminLayout>
        </>
    );
}

export default EmployeeManagement;