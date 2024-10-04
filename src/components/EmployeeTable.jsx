import { useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, TablePagination, Paper, IconButton, Box
} from "@mui/material";
import { Visibility, Edit, Delete, } from '@mui/icons-material';
import ModalElement from "./elements/ModalElement";
import { ModalActionEmployee } from "./elements/ModalActionContent";
import AvatarComponent from "./elements/UserAvatar";

const EmployeeTable = ({ employee, loadEmployee }) => {
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [modalTitle, setModalTItle] = useState('');

    // Pagination state
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleOpenModal = (employee, type, title) => {
        setSelectedEmployee(employee);
        setModalType(type);
        setModalTItle(title);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setSelectedEmployee(null);
        setOpenModal(false);
        loadEmployee();
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
                <Table sx={{ minWidth: 650 }} aria-label="employee table">
                    <TableHead sx={{ backgroundColor: 'primary.dark' }}>
                        <TableRow>
                            <TableCell sx={{ color: 'primary.contrastText' }}>Full Name</TableCell>
                            <TableCell sx={{ color: 'primary.contrastText' }}>Position</TableCell>
                            <TableCell sx={{ color: 'primary.contrastText' }}>Department</TableCell>
                            <TableCell align="right" sx={{ color: 'primary.contrastText' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {employee
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((record) => (
                            <TableRow key={record.employee_id}>
                                <TableCell>
                                    <Box sx={{ display:'flex', flexDirection:'row', alignItems:'center', gap:3 }}>
                                        <AvatarComponent url={ record.user?.profile_picture_url } size={36} />
                                        {record.user?.full_name}
                                    </Box>
                                </TableCell>
                                <TableCell>{record.position}</TableCell>
                                <TableCell>{record.department}</TableCell>
                                <TableCell align="right">
                                    <IconButton color="primary" onClick={() => handleOpenModal(record, 'detail', 'Employee Details')}>
                                        <Visibility />
                                    </IconButton>
                                    <IconButton color="warning" onClick={() => handleOpenModal(record, 'edit', 'Edit Employee Data')}>
                                        <Edit />
                                    </IconButton>
                                    {!record.user.is_active &&
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
                    count={employee.length}
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
                    <ModalActionEmployee
                        data={selectedEmployee}
                        modalType={modalType}
                        handleOpenModal={handleOpenModal}
                        handleCloseModal={handleCloseModal}
                    />
                )}
            />
        </>
    );
};

export default EmployeeTable;