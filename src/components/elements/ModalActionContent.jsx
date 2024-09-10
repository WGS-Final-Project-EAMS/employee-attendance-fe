import { useEffect } from 'react';
import { Typography, Box, Grid, Button, FormControl } from '@mui/material';
import { ReportGmailerrorred, CheckCircleOutline, Edit } from '@mui/icons-material';
import AdminForm from '../forms/AdminForm';
import EmployeeForm from '../forms/EmployeeForm';
import LeaveRequestForm from '../forms/LeaveRequestForm';
import AvatarComponent from './UserAvatar';
import { deleteAdmin } from '../../services/adminService';
import { deleteEmployee } from '../../services/employeeService';

export const ModalActionAdmin = ({ data, modalType, handleOpenModal, handleCloseModal=null }) => {
    const detailFields = [
        { label: 'Username', value: data?.user?.username },
        { label: 'Role', value: data?.user?.role },
        { label: 'Email', value: data?.user?.email },
        { label: 'Full Name', value: data?.full_name },
        { label: 'Phone Number', value: data?.phone_number },
        { label: 'Assigned By', value: data?.assignedBy?.username },
        { label: 'Status', value: data?.user?.is_active ? 'Active' : 'Non-active' },
    ];

    if (modalType === 'create') {
        return (
            <AdminForm />
        );
        // Implement form edit for admin
    }

    if (modalType === 'edit') {
        return <AdminForm mode='edit' adminData={data} />;
        // Implement form edit for admin
    }
    
    if (modalType === 'delete') {
        const handleDelete = async (e) => {
            e.preventDefault();
            const { success } = await deleteAdmin(data?.admin_id);
            if (success) {
                handleOpenModal({ message: 'Admin has been successfully deleted.' }, 'info');
            } else {
                handleOpenModal({ message: 'Failed to delete the admin. Please try again later.' }, 'info');
            }
        };

        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <ReportGmailerrorred sx={{ fontSize: 120 }} color='warning' />
                <Typography>Are you sure you want to delete {data?.user?.username || 'this admin'}?</Typography>
                <Box sx={{ flexDirection: 'row' }}>
                    <Button color="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <FormControl component="form" onSubmit={handleDelete}>
                        <Button type="submit" color="error">
                            Delete
                        </Button>
                    </FormControl>
                </Box>
            </Box>
        );
    }

    if (modalType === 'info') {
        useEffect(() => {
            const timer = setTimeout(() => {
                handleCloseModal();
            }, 1000); // Modal akan hilang setelah 3 detik
    
            return () => clearTimeout(timer); // Membersihkan timer jika komponen unmount
        }, [handleCloseModal]);

        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, pb: 4 }}>
                <CheckCircleOutline sx={{ fontSize: 120 }} color='success' />
                <Typography>{data?.message || 'Info message'}</Typography>
            </Box>
        );
    }

    if (modalType === 'detail') {
        
        return (
            <>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <AvatarComponent url={data?.profile_picture_url} />
                    {detailFields.map((field, index) => (
                        <Grid container spacing={2} key={index}>
                            <Grid item xs={4}>
                                <Typography variant="body1" color='secondary.main'>{field.label}</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="body1">{field.value}</Typography>
                            </Grid>
                        </Grid>
                    ))}
                </Box>
                <Button onClick={() => handleOpenModal(data, 'edit', 'Edit Admin Data')} sx={{ mt: 2 }} color="warning">
                    Edit
                </Button>
            </>
        );
    }
    
    return null;
};

export const ModalActionEmployee = ({ data, modalType, handleOpenModal, handleCloseModal = null }) => {
    const employmentDate = new Date(data?.employment_date).toLocaleDateString('en-GB');

    const detailFields = [
        { label: 'Full Name', value: data?.full_name },
        { label: 'Position', value: data?.position },
        { label: 'Department', value: data?.department },
        { label: 'Phone Number', value: data?.phone_number },
        { label: 'Supervisor', value: data?.manager?.full_name },
        { label: 'Employement Date', value: employmentDate },
        { label: 'Username', value: data?.user?.username },
        { label: 'Email', value: data?.user?.email },
        { label: 'Status', value: data?.user?.is_active ? 'Active' : 'Non-active' },
    ];

    if (modalType === 'create') {
        return (
            <EmployeeForm />
        );
    }

    if (modalType === 'edit') {
        return <EmployeeForm mode='edit' employeeData={data} />;
    }
    
    if (modalType === 'delete') {
        const handleDelete = async (e) => {
            e.preventDefault();
            const { success } = await deleteEmployee(data?.employee_id);
            if (success) {
                handleOpenModal({ message: 'Employee has been successfully deleted.' }, 'info');
            } else {
                handleOpenModal({ message: 'Failed to delete the Employee. Please try again later.' }, 'info');
            }
        };

        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <ReportGmailerrorred sx={{ fontSize: 120 }} color='warning' />
                <Typography>Are you sure you want to delete {data?.user?.username || 'this employee'}?</Typography>
                <Box sx={{ flexDirection: 'row' }}>
                    <Button color="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <FormControl component="form" onSubmit={handleDelete}>
                        <Button type="submit" color="error">
                            Delete
                        </Button>
                    </FormControl>
                </Box>
            </Box>
        );
    }

    if (modalType === 'info') {
        useEffect(() => {
            const timer = setTimeout(() => {
                handleCloseModal();
            }, 1000); // Modal akan hilang setelah 3 detik
    
            return () => clearTimeout(timer); // Membersihkan timer jika komponen unmount
        }, [handleCloseModal]);

        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, pb: 4 }}>
                <CheckCircleOutline sx={{ fontSize: 120 }} color='success' />
                <Typography>{data?.message || 'Info message'}</Typography>
            </Box>
        );
    }

    if (modalType === 'detail') {
        
        return (
            <>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', px:2 }}>
                    <AvatarComponent url={data?.profile_picture_url} />
                    {detailFields.map((field, index) => (
                        <Grid container spacing={2} key={index}>
                            <Grid item xs={4}>
                                <Typography variant="body1" color='secondary.main'>{field.label}</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="body1">{field.value}</Typography>
                            </Grid>
                        </Grid>
                    ))}
                </Box>
                <Button startIcon={<Edit />} fullWidth variant='contained' onClick={() => handleOpenModal(data, 'edit', 'Edit Admin Data')} sx={{ mt: 2 }} color="warning">
                    Edit
                </Button>
            </>
        );
    }
    
    return null;
};

export const ModalActionLeaveRequest = ({ data, modalType }) => {
    if (modalType === 'create') {
        return (
            <LeaveRequestForm />
        );
    }

    return null;
}

export const ModalActionErrorLog = ({ data, modalType }) => {

    if (modalType === 'detail') {
        const errorDate = new Date(data?.error_timestamp).toLocaleDateString('en-GB')
        const errorTimeString = new Date(data?.error_timestamp).toLocaleTimeString();
        const errorTime = `${errorDate} - ${errorTimeString}`;

        const detailFields = [
            { label: 'User', value: data?.user?.username },
            { label: 'User Email', value: data?.user?.email },
            { label: 'Error Type', value: data?.error_type },
            { label: 'Error Time', value: errorTime },
            { label: 'Error Message', value: data?.error_message },
        ];
        
        return (
            <>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {detailFields.map((field, index) => (
                        <Grid container spacing={2} key={index}>
                            <Grid item xs={4}>
                                <Typography variant="body1" color='secondary.main'>{field.label}</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="body1">{field.value}</Typography>
                            </Grid>
                        </Grid>
                    ))}
                </Box>
            </>
        );
    }
    
    return null;
};
