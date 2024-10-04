import { useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, TablePagination, Paper, IconButton, Box
} from "@mui/material";
import { Visibility, Edit, Delete, } from '@mui/icons-material';
import ModalElement from "./elements/ModalElement";
import { ModalActionAdmin } from "./elements/ModalActionContent";
import AvatarComponent from "./elements/UserAvatar";

const AdminTable = ({ admin, loadAdmin }) => {
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [modalTitle, setModalTItle] = useState('');

    // Pagination state
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleOpenModal = (admin, type, title) => {
        setSelectedAdmin(admin);
        setModalType(type);
        setModalTItle(title);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setSelectedAdmin(null);
        setOpenModal(false);
        loadAdmin();
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
                <Table sx={{ minWidth: 650 }} aria-label="admin table">
                    <TableHead sx={{ backgroundColor: 'primary.dark' }}>
                        <TableRow>
                            <TableCell sx={{ color: 'primary.contrastText' }}>Username</TableCell>
                            <TableCell sx={{ color: 'primary.contrastText' }}>Email</TableCell>
                            <TableCell sx={{ color: 'primary.contrastText' }}>Phone Number</TableCell>
                            <TableCell align="right" sx={{ color: 'primary.contrastText' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {admin
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((record) => (
                            <TableRow key={record.user_id}>
                                <TableCell>
                                    <Box sx={{ display:'flex', flexDirection:'row', alignItems:'center', gap:3 }}>
                                        <AvatarComponent url={ record.profile_picture_url } size={36} />
                                        {record.username}
                                    </Box>
                                </TableCell>
                                <TableCell>{record.email}</TableCell>
                                <TableCell>{record.phone_number}</TableCell>
                                <TableCell align="right">
                                    <IconButton color="primary" onClick={() => handleOpenModal(record, 'detail', 'Admin Details')}>
                                        <Visibility />
                                    </IconButton>
                                    <IconButton color="warning" onClick={() => handleOpenModal(record, 'edit', 'Edit Admin Data')}>
                                        <Edit />
                                    </IconButton>
                                    {!record.is_active &&
                                        <IconButton color="error" onClick={() => handleOpenModal(record, 'delete')}>
                                            <Delete />
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
                    count={admin.length}
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
                    <ModalActionAdmin
                        data={selectedAdmin}
                        modalType={modalType}
                        handleOpenModal={handleOpenModal}
                        handleCloseModal={handleCloseModal}
                    />
                )}
            />
        </>
    );
};

export default AdminTable;
