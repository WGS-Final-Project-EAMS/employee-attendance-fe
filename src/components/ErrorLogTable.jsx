import { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, IconButton } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import ModalElement from "./elements/ModalElement";
import { ModalActionErrorLog } from "./elements/ModalActionContent";

const ErrorLogTable = ({ errorLog, loadErrorLog }) => {
    const [selectedErrorLog, setSelectedErrorLog] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [modalTitle, setModalTItle] = useState('');

    // Pagination state
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleOpenModal = (errorLog, type, title) => {
        setSelectedErrorLog(errorLog);
        setModalType(type);
        setModalTItle(title);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setSelectedErrorLog(null);
        setOpenModal(false);
        loadErrorLog();
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
                <Table sx={{ minWidth: 650 }} aria-label="attendance history table">
                    <TableHead sx={{ backgroundColor: 'primary.dark' }}>
                        <TableRow>
                            <TableCell sx={{ color: 'primary.contrastText' }}>Error Type</TableCell>
                            <TableCell sx={{ color: 'primary.contrastText' }}>Error Time</TableCell>
                            <TableCell sx={{ color: 'primary.contrastText' }}>User</TableCell>
                            <TableCell sx={{ color: 'primary.contrastText' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {errorLog
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((record) => (
                            <TableRow key={record.error_log_id}>
                                <TableCell>
                                    {record.error_type}
                                </TableCell>
                                <TableCell>
                                    {new Date(record.error_timestamp).toLocaleDateString('en-GB')} - {new Date(record.error_timestamp).toLocaleTimeString()}
                                </TableCell>
                                <TableCell>
                                    {record?.user?.username}
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton color="primary" onClick={() => handleOpenModal(record, 'detail', 'Error Detail')}>
                                        <Visibility />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={errorLog.length}
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
                    <ModalActionErrorLog
                        data={selectedErrorLog}
                        modalType={modalType}
                    />
                )}
            />
        </>
    )
};

export default ErrorLogTable;
