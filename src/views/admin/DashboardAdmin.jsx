import { Box, Typography } from "@mui/material";
import AdminLayout from "../../layouts/AdminLayout";

const DashboardAdmin = () => {

    return (
      <AdminLayout>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap:2 }}>
            <Typography component="h1" variant="h4" color="primary.dark">
                Dashboard
            </Typography> 
        </Box>
      </AdminLayout>
    );
}

export default DashboardAdmin;