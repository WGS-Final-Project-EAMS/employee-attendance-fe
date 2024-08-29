import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Box, Button } from "@mui/material";
import { PersonAddAlt } from '@mui/icons-material';
import SuperAdminLayout from "../../layouts/SuperAdminLayout";
import { fetchActiveAdmin } from "../../services/adminService";
import LoadingIndicator from "../../components/LoadingIndicator";
import ErrorMessage from "../../components/ErrorMessage";
import AdminTable from "../../components/AdminTable";

const ActiveAdminManagement = () => {
    const [activeAdmin, setActiveAdmin] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const loadActiveAdmin = async () => {
            try {
                const data = await fetchActiveAdmin(); // Get attendance history data
                
                setActiveAdmin(data);
            } catch (error) {
                setError("Failed to fetch attendance history.");
                console.error("Error fetching attendance history:", error);
            } finally {
                setLoading(false); // Loading false if fetching successful
            }
        }

        loadActiveAdmin();
    }, []);

    const handleCreateClick = () => {
        navigate('/admin/create');
    };

    return (
        <>
            <SuperAdminLayout>
                <Container maxWidth="xl" sx={{ mt: 8, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography component="h1" variant="h4" color="primary.dark">
                        Admin Management
                    </Typography>
                    {/* Main Content */}
                    <Box sx={{ my: 4, mt: 4 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ mb: 4 }}
                            onClick={handleCreateClick}
                        >
                            <PersonAddAlt sx={{ mr: 2 }} />
                            <Typography component="h1" variant="body1">Create New Admin</Typography>
                        </Button>
                        {loading ? (
                            <LoadingIndicator />
                        ) : error ? (
                            <ErrorMessage message={error} />
                        ) : activeAdmin.length === 0 ? (
                            <Typography>No attendance history found.</Typography>
                        ) : (
                            <AdminTable admin={activeAdmin} />
                        )}
                    </Box>
                </Container>
            </SuperAdminLayout>
        </>
    );
}

export default ActiveAdminManagement;