import { useState, useEffect } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { PersonAddAlt } from '@mui/icons-material';
import SuperAdminLayout from "../../layouts/SuperAdminLayout";
import { fetchActiveAdmin } from "../../services/adminService";
import LoadingIndicator from "../../components/LoadingIndicator";
import ErrorMessage from "../../components/ErrorMessage";
import AdminTable from "../../components/AdminTable";
import ModalElement from "../../components/elements/ModalElement";

const ActiveAdminManagement = () => {
    const [activeAdmin, setActiveAdmin] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const renderModalContent = () => {
        return <Typography variant="h6">Create Admin Form</Typography>;
    };


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
                            onClick={handleOpenModal}
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
                {/* Modal */}
                <ModalElement openModal={openModal} handleCloseModal={handleCloseModal} renderModalContent={renderModalContent}/>
            </SuperAdminLayout>
        </>
    );
}

export default ActiveAdminManagement;