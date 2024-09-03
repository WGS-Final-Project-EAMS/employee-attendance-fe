import { useState, useEffect } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { PersonAddAlt } from '@mui/icons-material';
import SuperAdminLayout from "../../layouts/SuperAdminLayout";
import { fetchNonActiveAdmin } from "../../services/adminService";
import LoadingIndicator from "../../components/LoadingIndicator";
import ErrorMessage from "../../components/ErrorMessage";
import AdminTable from "../../components/AdminTable";
import ModalElement from "../../components/elements/ModalElement";
import ModalActionContent from "../../components/elements/ModalActionContent";

const NonActiveAdmin = () => {
    const [nonActiveAdmin, setAdmin] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const loadNonactiveAdmin = async () => {
        try {
            const data = await fetchNonActiveAdmin(); // Get attendance history data
            
            setAdmin(data);
        } catch (error) {
            setError("Failed to fetch attendance history.");
            console.error("Error fetching attendance history:", error);
        } finally {
            setLoading(false); // Loading false if fetching successful
        }
    }

    useEffect(() => {
        loadNonactiveAdmin();
    }, []);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        loadNonactiveAdmin();
    };

    return (
        <>
            <SuperAdminLayout>
                <Container maxWidth="xl" sx={{ mt: 8, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography component="h1" variant="h4" color="primary.dark">
                        Non Active Admin
                    </Typography>
                    {/* Main Content */}
                    <Box sx={{ my: 4, mt: 4 }}>
                        {loading ? (
                            <LoadingIndicator />
                        ) : error ? (
                            <ErrorMessage message={error} />
                        ) : nonActiveAdmin.length === 0 ? (
                            <Typography>No non-active admin found.</Typography>
                        ) : (
                            <AdminTable admin={nonActiveAdmin} loadAdmin={loadNonactiveAdmin} />
                        )}
                    </Box>
                </Container>
                {/* Modal */}
                <ModalElement openModal={openModal} handleCloseModal={handleCloseModal} modalTitle="Create New Admin"
                    renderModalContent={
                        () => <ModalActionContent modalType="create" handleOpenModal={handleOpenModal} />
                    }/>
            </SuperAdminLayout>
        </>
    );
}

export default NonActiveAdmin;