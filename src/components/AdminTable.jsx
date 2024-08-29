import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import { Visibility, Edit, Delete } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

const AdminTable = ({ admin }) => {
    const navigate = useNavigate();

    const handleDetailClick = (adminId) => {
        navigate(`/admin/detail/${adminId}`);
    };

    const handleEditClick = (adminId) => {
        navigate(`/admin/edit/${adminId}`);
    };

    const handleDeleteClick = (adminId) => {
        if (window.confirm('Are you sure you want to delete this admin?')) {
            onDelete(adminId);
        }
    };

    return (
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
                            <TableCell>
                                {record.user.username}
                            </TableCell>
                            <TableCell>
                                {record.full_name}
                            </TableCell>
                            <TableCell>
                                {record.phone_number}
                            </TableCell>
                            <TableCell align="right">
                                <IconButton
                                    color="primary"
                                    onClick={() => handleDetailClick(record.admin_id)}
                                >
                                    <Visibility />
                                </IconButton>
                                <IconButton
                                    color="warning"
                                    onClick={() => handleEditClick(record.admin_id)}
                                >
                                    <Edit />
                                </IconButton>
                                <IconButton
                                    color="error"
                                    onClick={() => handleDeleteClick(record.admin_id)}
                                >
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default AdminTable;
