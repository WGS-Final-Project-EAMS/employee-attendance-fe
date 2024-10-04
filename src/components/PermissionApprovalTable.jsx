import { useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, TablePagination, Paper, IconButton, Box, Chip, Tabs, Tab
} from "@mui/material";
import { Visibility, CheckCircle, Cancel, Refresh } from '@mui/icons-material';
import ModalElement from "./elements/ModalElement";
import { ModalActionLeaveRequest } from "./elements/ModalActionContent";
import AvatarComponent from "./elements/UserAvatar";

const PermissionApprovalTable = ({ leaveRequests, loadLeaveRequests }) => {
    const [selectedLeaveRequest, setSelectedLeaveRequest] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [modalTitle, setModalTitle] = useState('');

    // Pagination state
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Tab state
    const [tabIndex, setTabIndex] = useState(0);

    const handleOpenModal = (leaveRequest, type, title) => {
        setSelectedLeaveRequest(leaveRequest);
        setModalType(type);
        setModalTitle(title);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setSelectedLeaveRequest(null);
        setOpenModal(false);
        loadLeaveRequests();
    };

    // Pagination handle
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Tab handle
    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
        setPage(0); // Reset page when switching tabs
    };

    // Filter data based on tab index
    const filteredRequests = tabIndex === 0
        ? leaveRequests.filter((record) => record.status === 'pending')
        : leaveRequests.filter((record) => record.status === 'approved' || record.status === 'rejected');

    return (
        <>
            <Tabs value={tabIndex} onChange={handleTabChange} aria-label="leave request tabs" sx={{ mb:2 }}>
                <Tab label="Pending" />
                <Tab label="Approved & Rejected" />
            </Tabs>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="leave request table">
                    <TableHead sx={{ backgroundColor: 'primary.dark' }}>
                        <TableRow>
                            <TableCell component="th" sx={{ color: 'primary.contrastText' }}>Employee Name</TableCell>
                            <TableCell component="th" sx={{ color: 'primary.contrastText' }} align="center">Leave Type</TableCell>
                            <TableCell component="th" sx={{ color: 'primary.contrastText' }}>Leave Time</TableCell>
                            <TableCell component="th" sx={{ color: 'primary.contrastText' }} align="center">Status</TableCell>
                            <TableCell component="th" align="right" sx={{ color: 'primary.contrastText' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRequests
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((record) => (
                                <TableRow key={record.leave_request_id}>
                                    <TableCell>
                                        <Box sx={{ display:'flex', flexDirection:'row', alignItems:'center', gap:3 }}>
                                            <AvatarComponent url={record.employee?.user?.profile_picture_url} size={36} />
                                            {record.employee?.user?.full_name}
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center">
                                        {record.leave_type}
                                    </TableCell>
                                    <TableCell>
                                        {`${new Date(record.start_date).toLocaleDateString()} - ${new Date(record.end_date).toLocaleDateString()}`}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Chip label={record.status} color={
                                            record.status === "pending" ? 'warning'
                                            : record.status === "approved" ? 'success'
                                            : record.status === "rejected" ? 'error'
                                            : 'secondary'}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton color="primary" onClick={() => handleOpenModal(record, 'detail', 'Leave Request Details')}>
                                            <Visibility />
                                        </IconButton>
                                        {record.status === 'pending' && (
                                            <>
                                                <IconButton color="success" onClick={() => handleOpenModal(record, 'approve', 'Approve Leave Request')}>
                                                    <CheckCircle />
                                                </IconButton>
                                                <IconButton color="error" onClick={() => handleOpenModal(record, 'reject', 'Reject Leave Request')}>
                                                    <Cancel />
                                                </IconButton>
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>

                <Box sx={{ display:'flex', justifyContent:'flex-end' }}>
                    <IconButton color="secondary" onClick={() => loadLeaveRequests()}>
                        <Refresh />
                    </IconButton>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredRequests.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>
            </TableContainer>

            {/* Modal */}
            <ModalElement
                openModal={openModal}
                handleCloseModal={handleCloseModal}
                modalTitle={modalTitle}
                renderModalContent={() => (
                    <ModalActionLeaveRequest
                        data={selectedLeaveRequest}
                        modalType={modalType}
                        handleOpenModal={handleOpenModal}
                        handleCloseModal={handleCloseModal}
                    />
                )}
            />
        </>
    );
};

export default PermissionApprovalTable;