import { useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, TablePagination, Paper, IconButton, Box, Chip
} from "@mui/material";
import { Visibility, CheckCircle, Cancel } from '@mui/icons-material';
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

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="leave request table">
                    <TableHead sx={{ backgroundColor: 'primary.dark' }}>
                        <TableRow>
                            <TableCell sx={{ color: 'primary.contrastText' }}>Full Name</TableCell>
                            <TableCell sx={{ color: 'primary.contrastText' }}>Leave Time</TableCell>
                            <TableCell sx={{ color: 'primary.contrastText' }}>Status</TableCell>
                            <TableCell align="right" sx={{ color: 'primary.contrastText' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leaveRequests
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((record) => (
                                <TableRow key={record.leave_request_id}>
                                    <TableCell>
                                        <Box sx={{ display:'flex', flexDirection:'row', alignItems:'center', gap:3 }}>
                                            <AvatarComponent url={record.employee.profile_picture_url} size={36} />
                                            {record.employee.full_name}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        {`${new Date(record.start_date).toLocaleDateString()} - ${new Date(record.end_date).toLocaleDateString()}`}
                                    </TableCell>
                                    <TableCell>
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
                                        {record.status === 'pending' &&
                                            <IconButton color="success" onClick={() => handleOpenModal(record, 'approve', 'Approve Leave Request')}>
                                                <CheckCircle />
                                            </IconButton>
                                        }
                                        {record.status === 'pending' &&
                                            <IconButton color="error" onClick={() => handleOpenModal(record, 'reject', 'Reject Leave Request')}>
                                                <Cancel />
                                            </IconButton>
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={leaveRequests.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
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