import { useState, useEffect } from "react";
import { Container, Typography, Box, Button, Tabs, Tab } from "@mui/material";
import { PersonAddAlt } from '@mui/icons-material';
import { fetchEmployee, fetchInactiveEmployees } from "../../services/employeeService";
import LoadingIndicator from "../../components/LoadingIndicator";
import ErrorMessage from "../../components/ErrorMessage";
import EmployeeTable from "../../components/EmployeeTable";
import ModalElement from "../../components/elements/ModalElement";
import { ModalActionEmployee } from "../../components/elements/ModalActionContent";

const EmployeeManagement = () => {
    const [employee, setEmployee] = useState([]);
    const [nonactiveEmployee, setNonactiveEmployee] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [tabValue, setTabValue] = useState(0);

    // Pagination state
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalItems, setTotalItems] = useState(0);

    const title = "Employee Management";

    // Load active employee
    const loadEmployee = async () => {
        try {
            const data = await fetchEmployee(page, rowsPerPage); // Get attendance history data
            
            setEmployee(data.data);
            setTotalItems(data.totalItems);
        } catch (error) {
            setError("Failed to fetch attendance history.");
            console.error("Error fetching attendance history:", error);
        } finally {
            setLoading(false); // Loading false if fetching successful
        }
    }

    // Load inactive employee
    const loadInactiveEmployee = async () => {
        try {
            const data = await fetchInactiveEmployees(page, rowsPerPage); // Get attendance history data
            
            setNonactiveEmployee(data.data);
            setTotalItems(data.totalItems);
        } catch (error) {
            setError("Failed to fetch attendance history.");
            console.error("Error fetching attendance history:", error);
        } finally {
            setLoading(false); // Loading false if fetching successful
        }
    }

    useEffect(() => {
        tabValue === 0 ? loadEmployee() : loadInactiveEmployee();
    }, [tabValue, page, rowsPerPage]);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        loadEmployee();
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    // Pagination handle
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
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

                    {/* Tabs for switching between admin and employee sign-in */}
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="sign-in tabs" sx={{ mb:2 }}>
                        <Tab label="Active" />
                        <Tab label="Inactive" />
                    </Tabs>

                    {loading ? (
                        <LoadingIndicator />
                    ) : error ? (
                        <ErrorMessage message={error} />
                    ) : tabValue === 0 && employee.length === 0 ? (
                        <Typography>No employee found.</Typography>
                    ) : tabValue === 1 && nonactiveEmployee.length === 0 ? (
                        <Typography>No inactive employee found.</Typography>
                    ) : (
                        <EmployeeTable
                            employee={tabValue === 0 ? employee : nonactiveEmployee}
                            loadEmployee={tabValue === 0 ? loadEmployee : loadInactiveEmployee}
                            handleChangePage={handleChangePage}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            totalItems={totalItems}
                        />
                    )}
                </Box>
            </Container>

            {/* Modal */}
            <ModalElement openModal={openModal} handleCloseModal={handleCloseModal} modalTitle="Create New Employee"
                renderModalContent={
                    () => <ModalActionEmployee modalType="create" handleOpenModal={handleOpenModal} />
                }/>
        </>
    );
}

export default EmployeeManagement;