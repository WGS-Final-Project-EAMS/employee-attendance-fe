import { useState, useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import AdminLayout from "../../layouts/AdminLayout";
import { fetchInactiveEmployees } from "../../services/employeeService";
import LoadingIndicator from "../../components/LoadingIndicator";
import ErrorMessage from "../../components/ErrorMessage";
import EmployeeTable from "../../components/EmployeeTable";

const InactiveEmployeeManagement = () => {
    const [employee, setEmployee] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadEmployee = async () => {
        try {
            const data = await fetchInactiveEmployees(); // Get attendance history data
            
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

    return (
        <>
            <AdminLayout>
                <Container maxWidth="xl" sx={{ mt: 8, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography component="h1" variant="h4" color="primary.dark">
                        Employee Management
                    </Typography>
                    {/* Main Content */}
                    <Box sx={{ my: 4, mt: 4 }}>
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
            </AdminLayout>
        </>
    );
}

export default InactiveEmployeeManagement;