import { useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, IconButton, 
} from "@mui/material";
import { Visibility, Edit, Delete, } from '@mui/icons-material';
import ModalElement from "./elements/ModalElement";
import ModalActionContent from "./elements/ModalActionContent";
import AvatarComponent from "./elements/UserAvatar";

const AdminTable = ({ admin, onDelete }) => {
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [modalTitle, setModalTItle] = useState('');

    const handleOpenModal = (admin, type, title) => {
        setSelectedAdmin(admin);
        setModalType(type);
        setModalTItle(title);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setSelectedAdmin(null);
        setOpenModal(false);
    };

    const handleDeleteClick = (adminId) => {
        if (window.confirm('Are you sure you want to delete this admin?')) {
            onDelete(adminId);
        }
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="admin table">
                    <TableHead sx={{ backgroundColor: 'primary.dark' }}>
                        <TableRow>
                            <TableCell sx={{ color: 'primary.contrastText' }}>Username</TableCell>
                            <TableCell sx={{ color: 'primary.contrastText' }}>Full Name</TableCell>
                            <TableCell sx={{ color: 'primary.contrastText' }}>Phone Number</TableCell>
                            <TableCell align="right" sx={{ color: 'primary.contrastText' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {admin.map((record) => (
                            <TableRow key={record.admin_id}>
                                <TableCell sx={{ display:'flex', flexDirection:'row', alignItems:'center', gap:3 }}>
                                    <AvatarComponent url={ record.profile_picture_url } size={36} />
                                    {record.user.username}
                                </TableCell>
                                <TableCell>{record.full_name}</TableCell>
                                <TableCell>{record.phone_number}</TableCell>
                                <TableCell align="right">
                                    <IconButton color="primary" onClick={() => handleOpenModal(record, 'detail', 'Admin Details')}>
                                        <Visibility />
                                    </IconButton>
                                    <IconButton color="warning" onClick={() => handleOpenModal(record, 'edit', 'Edit Admin Data')}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDeleteClick(record.admin_id)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal */}
            <ModalElement
                openModal={openModal}
                handleCloseModal={handleCloseModal}
                modalTitle={modalTitle}
                renderModalContent={() => (
                    <ModalActionContent
                        selectedAdmin={selectedAdmin}
                        modalType={modalType}
                        handleOpenModal={handleOpenModal}
                    />
                )}
            />
        </>
    );
};

export default AdminTable;
