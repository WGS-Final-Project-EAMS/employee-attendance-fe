import { useState, useEffect } from "react";
import { Container, Box, Grid, Typography, Chip, Card, CardContent, Button, Pagination, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { Add } from "@mui/icons-material";
import { fetchLeaveRequest } from "../services/leaveRequestService";
import ModalElement from "./elements/ModalElement";
import { ModalActionLeaveRequest } from "./elements/ModalActionContent";

const LeaveRequestTable = ({ title, filterStatus }) => {
    const [leaveRequest, setLeaveRequest] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    // Pagination state
    const [page, setPage] = useState(1); // Mulai dari halaman 1
    const [rowsPerPage, setRowsPerPage] = useState(5);

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

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        loadLeaveRequest();
    };

    // Pagination handle
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1); // Reset ke halaman pertama setiap kali rows per page diubah
    };

    useEffect(() => {
        loadLeaveRequest();
    }, []);

    // Filter dan pagination data
    const filteredData = leaveRequest.filter((record) => filterStatus.includes(record.status));
    const paginatedData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage); // Paginate data

    return (
        <Container maxWidth="xl" sx={{ mt: 8, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
            <Typography variant="h4" component="h1" color="primary.dark" gutterBottom>
                {title}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <FormControl>
                    <InputLabel id="rows-select-label">Rows</InputLabel>
                    <Select
                        labelId="rows-select-label"
                        id="rows-select"
                        label="Rows"
                        value={rowsPerPage}
                        onChange={handleChangeRowsPerPage}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Rows per page' }}
                        sx={{ width: 80, height: 48 }}
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                    </Select>
                </FormControl>
                {filterStatus[0] === 'pending' && (
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        onClick={handleOpenModal}
                    >
                        <Add sx={{ mr: 2 }} />
                        <Typography component="h1" variant="body1">Create New Leave Request</Typography>
                    </Button>
                )}
                <Pagination
                    count={Math.ceil(filteredData.length / rowsPerPage)} // Total halaman
                    page={page}
                    onChange={handleChangePage}
                    color="primary"
                />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {filteredData.length === 0 ? (
                    <Typography>No leave request found</Typography>
                ) : (
                    paginatedData.map((record) => (
                        <Card key={record.leave_request_id} variant="outlined">
                            <CardContent>
                                <Grid container spacing={2}>
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
                                        <Chip
                                            label={record.status}
                                            color={
                                                record.status === "pending" ? 'warning'
                                                    : record.status === "approved" ? 'success'
                                                        : record.status === "rejected" ? 'error'
                                                            : 'secondary'
                                            }
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    ))
                )}
            </Box>

            {/* Modal */}
            <ModalElement
                openModal={openModal}
                handleCloseModal={handleCloseModal}
                modalTitle="Create New Leave Request"
                renderModalContent={() => <ModalActionLeaveRequest modalType="create" />}
            />
        </Container>
    );
};

export default LeaveRequestTable;