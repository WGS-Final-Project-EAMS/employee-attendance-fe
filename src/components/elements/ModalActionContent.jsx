import { useEffect, useState } from 'react';
import { Typography, Box, Grid, Button, FormControl } from '@mui/material';
import { ReportGmailerrorred, CheckCircleOutline, Edit } from '@mui/icons-material';
import AdminForm from '../forms/AdminForm';
import EmployeeForm from '../forms/EmployeeForm';
import LeaveRequestForm from '../forms/LeaveRequestForm';
import AvatarComponent from './UserAvatar';
import { deleteAdmin } from '../../services/adminService';
import { fetchEmployeeByUserId, deleteEmployee } from '../../services/employeeService';
import { updateLeaveRequest, cancelLeaveRequest } from '../../services/leaveRequestService';

export const InfoModal = ({ message, handleCloseModal, duration = 3000, type = "success" }) => {
  
    useEffect(() => {
      const timer = setTimeout(() => {
        handleCloseModal();
      }, duration); // Modal akan hilang setelah durasi yang ditentukan (default 3 detik)
  
      return () => clearTimeout(timer); // Membersihkan timer jika komponen unmount
    }, [handleCloseModal, duration]);
  
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, pb: 4 }}>
        {type === "success" && (
            <CheckCircleOutline sx={{ fontSize: 120 }} color='success' />
        )}
        <Typography>{message || 'Info message'}</Typography>
      </Box>
    );
};

export const ModalActionAdmin = ({ data, modalType, handleOpenModal, handleCloseModal = null }) => {
    const [employee, setEmployee] = useState({});
    const employmentDate = new Date(data?.employment_date).toLocaleDateString('en-GB');
    
    const loadEmployee = async () => {
        const result = await fetchEmployeeByUserId(data?.user_id);
        
        setEmployee(result);
    }

    useEffect(() => {
        loadEmployee();
    }, [])

    const detailFields = [
        { label: 'Full Name', value: data?.full_name },
        { label: 'Position', value: employee?.position },
        { label: 'Department', value: employee?.department },
        { label: 'Supervisor', value: employee?.manager?.full_name },
        { label: 'Phone Number', value: data?.phone_number },
        { label: 'Employement Date', value: employmentDate },
        { label: 'Username', value: data?.username },
        { label: 'Email', value: data?.email },
        { label: 'Status', value: data?.is_active ? 'Active' : 'Non-active' },
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
                <Button onClick={() => handleOpenModal(data, 'edit', 'Edit Admin Data')} sx={{ mt: 2 }} color="warning" variant="contained" fullWidth>
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
        { label: 'Full Name', value: data?.user?.full_name },
        { label: 'Position', value: data?.position },
        { label: 'Department', value: data?.department },
        { label: 'Phone Number', value: data?.user?.phone_number },
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
                    <AvatarComponent url={data?.user?.profile_picture_url} />
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

export const ModalActionLeaveRequest = ({ data, modalType, handleOpenModal, handleCloseModal = null }) => {
    const startDate = new Date(data?.start_date).toLocaleDateString('en-GB');
    const endDate = new Date(data?.end_date).toLocaleDateString('en-GB');

    const detailFields = [
        { label: 'Full Name', value: data?.employee?.full_name },
        { label: 'Leave Type', value: data?.leave_type },
        { label: 'Leave Reason', value: data?.leave_reason },
        { label: 'Leave Time', value: `${startDate} - ${endDate}` },
        { label: 'Status', value: data?.status },
    ];

    const handleCancel = async (e) => {
        e.preventDefault();
        const { success } = await cancelLeaveRequest(data);
        
        if (success) {
            handleOpenModal({ message: 'Leave request canceled.' }, 'info');
        } else {
            handleOpenModal({ message: 'Failed to cancel leave request. Please try again later.' }, 'info');
        }
    };

    const handleApprove = async (e) => {
        e.preventDefault();
        const { success } = await updateLeaveRequest(data, { status: "approved" });
        
        if (success) {
            handleOpenModal({ message: 'Leave request approved.' }, 'info');
        } else {
            handleOpenModal({ message: 'Failed to approve leave request. Please try again later.' }, 'info');
        }
    };

    const handleReject = async (e) => {
        e.preventDefault();
        const { success } = await updateLeaveRequest(data, {status: 'rejected'});
        if (success) {
            handleOpenModal({ message: 'Leave request rejected.' }, 'info');
        } else {
            handleOpenModal({ message: 'Failed to reject leave request. Please try again later.' }, 'info');
        }
    };

    if (modalType === 'create') {
        return (
            <LeaveRequestForm />
        );
    }

    if (modalType === 'detail') {
        return (
            <>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', px:2 }}>
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
                {data?.status === "pending" &&
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px', mt:4 }}>
                        <FormControl component="form" onSubmit={handleReject}>
                            <Button type="submit" color="error">
                                Reject
                            </Button>
                        </FormControl>
                        <FormControl component="form" onSubmit={handleApprove}>
                            <Button type="submit" color="primary">
                                Approve
                            </Button>
                        </FormControl>
                    </Box>
                }
            </>
        );
    }

    if (modalType === 'cancel') {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <ReportGmailerrorred sx={{ fontSize: 120 }} color='warning' />
                <Typography>Are you sure you want to cancel this leave request?</Typography>
                <Box sx={{ flexDirection: 'row' }}>
                    <Button color="secondary" onClick={handleCloseModal}>
                        No
                    </Button>
                    <FormControl component="form" onSubmit={handleCancel}>
                        <Button type="submit" color="primary">
                            Yes
                        </Button>
                    </FormControl>
                </Box>
            </Box>
        );
    }

    if (modalType === 'approve') {

        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <ReportGmailerrorred sx={{ fontSize: 120 }} color='warning' />
                <Typography>Are you sure you want to approve leave request from {data?.employee?.full_name || 'this employee'}?</Typography>
                <Box sx={{ flexDirection: 'row' }}>
                    <Button color="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <FormControl component="form" onSubmit={handleApprove}>
                        <Button type="submit" color="primary">
                            Approve
                        </Button>
                    </FormControl>
                </Box>
            </Box>
        );
    }

    if (modalType === 'reject') {

        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <ReportGmailerrorred sx={{ fontSize: 120 }} color='warning' />
                <Typography>Are you sure you want to reject leave request from {data?.employee?.full_name || 'this employee'}?</Typography>
                <Box sx={{ flexDirection: 'row' }}>
                    <Button color="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <FormControl component="form" onSubmit={handleReject}>
                        <Button type="submit" color="error">
                            Reject
                        </Button>
                    </FormControl>
                </Box>
            </Box>
        );
    }

    if (modalType === 'info') {
        return (
            <InfoModal
            message={data?.message || 'Info Message'}
            handleCloseModal={handleCloseModal}
            duration={1000}
            />
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
