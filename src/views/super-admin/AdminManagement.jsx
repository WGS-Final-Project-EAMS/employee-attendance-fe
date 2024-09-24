import { useState, useEffect } from "react";
import { Container, Typography, Box, Button, Tabs, Tab } from "@mui/material";
import { PersonAddAlt } from '@mui/icons-material';
import SuperAdminLayout from "../../layouts/SuperAdminLayout";
import { fetchActiveAdmin, fetchNonActiveAdmin } from "../../services/adminService";
import LoadingIndicator from "../../components/LoadingIndicator";
import ErrorMessage from "../../components/ErrorMessage";
import AdminTable from "../../components/AdminTable";
import ModalElement from "../../components/elements/ModalElement";
import { ModalActionAdmin } from "../../components/elements/ModalActionContent";

const AdminManagement = () => {
    const [activeAdmin, setActiveAdmin] = useState([]);
    const [nonActiveAdmin, setNonActiveAdmin] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [tabValue, setTabValue] = useState(0);

    const title = "Admin Management";

    // Get active admin for active admin tab
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

    // Get nonactive admin for nonactive admin tab
    const loadNonactiveAdmin = async () => {
        try {
            const data = await fetchNonActiveAdmin(); // Get attendance history data
            
            setNonActiveAdmin(data);
        } catch (error) {
            setError("Failed to fetch attendance history.");
            console.error("Error fetching attendance history:", error);
        } finally {
            setLoading(false); // Loading false if fetching successful
        }
    }

    useEffect(() => {
        loadActiveAdmin();
        loadNonactiveAdmin();
    }, [tabValue]);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        loadActiveAdmin();
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <>
            <SuperAdminLayout title={title}>
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
                            <Typography component="h1" variant="body1">Create New Admin</Typography>
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
                        ) : tabValue === 0 && activeAdmin.length === 0 ? (
                            <Typography>No active admin found.</Typography>
                        ) : tabValue === 1 && nonActiveAdmin.length === 0 ? (
                            <Typography>No inactive admin found.</Typography>
                        ) : (
                            <AdminTable
                                admin={tabValue === 0 ? activeAdmin : nonActiveAdmin}
                                loadAdmin={tabValue === 0 ? loadActiveAdmin : loadNonactiveAdmin}
                            />
                        )}
                    </Box>
                </Container>
                {/* Modal */}
                <ModalElement openModal={openModal} handleCloseModal={handleCloseModal} modalTitle="Create New Admin"
                    renderModalContent={
                        () => <ModalActionAdmin modalType="create" handleOpenModal={handleOpenModal} />
                    }/>
            </SuperAdminLayout>
        </>
    );
}

export default AdminManagement;