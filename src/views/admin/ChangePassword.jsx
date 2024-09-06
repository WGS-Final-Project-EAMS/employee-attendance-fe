import { Box, Typography } from '@mui/material';
import AdminLayout from '../../layouts/AdminLayout';
import ChangePasswordForm from '../../components/forms/ChangePasswordForm';

const ChangePassword = () => {
  return (
    <AdminLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: 2,
          padding: 4,
        }}
      >
        <Typography component="h1" variant="h4" color="primary.dark">
          Change Password
        </Typography>

        <ChangePasswordForm />
      </Box>
    </AdminLayout>
  );
};

export default ChangePassword;
