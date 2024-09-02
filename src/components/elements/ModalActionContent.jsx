import { Typography, Box, Grid, Button } from '@mui/material';
import AdminForm from '../forms/AdminForm';
import AvatarComponent from './UserAvatar';

const ModalActionContent = ({ selectedAdmin, modalType, handleOpenModal, onSubmit }) => {
    const detailFields = [
        { label: 'Username', value: selectedAdmin?.user.username },
        { label: 'Role', value: selectedAdmin?.user.role },
        { label: 'Email', value: selectedAdmin?.user.email },
        { label: 'Full Name', value: selectedAdmin?.full_name },
        { label: 'Phone Number', value: selectedAdmin?.phone_number },
        { label: 'Assigned By', value: selectedAdmin?.assignedBy?.username },
        { label: 'Status', value: selectedAdmin?.is_active ? 'Active' : 'Non-active' },
    ];

    if (modalType === 'create') {
        return (
            <AdminForm />
        );
        // Implement form edit for admin
    }

    if (modalType === 'edit') {
        return <AdminForm mode='edit' adminData={selectedAdmin} />;
        // Implement form edit for admin
    }

    if (modalType === 'detail') {
        
        return (
            <>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <AvatarComponent url={selectedAdmin?.profile_picture_url} />
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
                <Button onClick={() => handleOpenModal(selectedAdmin, 'edit')} sx={{ mt: 2 }} color="warning">
                    Edit
                </Button>
            </>
        );
    }
    
    return null;
};

export default ModalActionContent;
