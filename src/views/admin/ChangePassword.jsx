import { Box, Typography } from '@mui/material';
// import AdminLayout from '../../layouts/AdminLayout';
// import EmployeeLayout from '../../layouts/EmployeeLayout';
// import SuperAdminLayout from '../../layouts/SuperAdminLayout';
import ChangePasswordForm from '../../components/forms/ChangePasswordForm';

const ChangePassword = () => {
  
  // // Memilih layout yang sesuai berdasarkan role user
  // const getLayoutComponent = () => {
  //   switch (role) {
  //     case 'admin':
  //       return AdminLayout;
  //     case 'employee':
  //       return EmployeeLayout;
  //     case 'super_admin':
  //       return SuperAdminLayout;
  //     default:
  //       return AdminLayout; // Default layout jika role tidak dikenal
  //   }
  // };

  // // Mendapatkan komponen layout
  // const LayoutComponent = getLayoutComponent();

  return (
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
    // <LayoutComponent>
    // </LayoutComponent>
  );
};

export default ChangePassword;
