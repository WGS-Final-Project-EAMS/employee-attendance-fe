import { useState, useEffect } from "react";
import EmployeeLayout from "../../layouts/EmployeeLayout";
import {
    Container, Box, Grid,
    Typography, Chip,
    Button,
    Card, CardContent
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { fetchLeaveRequest } from "../../services/leaveRequestService";
import ModalElement from "../../components/elements/ModalElement";
import { ModalActionLeaveRequest } from "../../components/elements/ModalActionContent";

const ApplicationForPermit = () => {
    const [leaveRequest, setLeaveRequest] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const loadLeaveRequest = async () => {
        try {
            const data = await fetchLeaveRequest();
            setLeaveRequest(data);
        } catch (error) {
            console.error("Error fetching leave request:", error);
        }
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
    }

    useEffect(() => {
        loadLeaveRequest();
    }, []);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        loadLeaveRequest();
    };

    return (
        <EmployeeLayout>
            <Container maxWidth="xl" sx={{ mt: 8, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {/* Header */}
                <Typography variant="h4" component="h1" color="primary.dark" gutterBottom>
                    Application for Permit
                </Typography>
                
                {/* Body */}
                <Box sx={{ my: 4, mt: 4 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mb: 4 }}
                        onClick={handleOpenModal}
                    >
                        <Add sx={{ mr: 2 }} />
                        <Typography component="h1" variant="body1">Create New Leave Request</Typography>
                    </Button>
                    <Box sx={{ display: 'flex', flexDirection:'column', gap:2 }}>
                        {leaveRequest.length === 0 ?
                            (<Typography>No leave request found</Typography>)
                            :
                            leaveRequest
                                .map((record) => (
                                <Card key={record.leave_request_id} variant="outlined">
                                    <CardContent>
                                        <Grid container spacing={2} >
                                            <Grid item xs={3}>
                                                <Typography variant="body1" color='secondary.main'>
                                                    Leave Type
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={9}>
                                                <Typography variant="body1">
                                                    {record.leave_type}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography variant="body1" color='secondary.main'>
                                                    Leave Reason
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={9}>
                                                <Typography variant="body1">
                                                    {record.leave_reason}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography variant="body1" color='secondary.main'>
                                                    Leave Time
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={9}>
                                                <Typography variant="body1">
                                                    {formatDate(record.start_date)} - {formatDate(record.end_date)}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography variant="body1" color='secondary.main'>
                                                    Supervisor
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={9}>
                                                <Typography variant="body1">
                                                    {record.manager?.full_name}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography variant="body1" color='secondary.main'>
                                                    Status
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={9}>
                                                {/* <Typography variant="body1"
                                                    color={
                                                        record.status === "pending" ? 'warning.main'
                                                        : record.status === "approved" ? 'success.main'
                                                            : record.status === "rejected" ? 'error.main'
                                                                    : 'secondary.contrastText'
                                                    }
                                                >
                                                    {record.status}
                                                </Typography> */}
                                                <Chip label={record.status} color={
                                                        record.status === "pending" ? 'warning'
                                                        : record.status === "approved" ? 'success'
                                                        : record.status === "rejected" ? 'error'
                                                        : 'secondary'}
                                                    // variant="outlined"
                                                />
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            ))
                        }
                    </Box>
                </Box>
            </Container>
            {/* Modal */}
            <ModalElement openModal={openModal} handleCloseModal={handleCloseModal} modalTitle="Create New Leave Request"
                    renderModalContent={
                        () => <ModalActionLeaveRequest modalType="create" />
                    }/>
        </EmployeeLayout>
    );
};

export default ApplicationForPermit;
