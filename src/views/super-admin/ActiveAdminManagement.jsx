import SuperAdminLayout from "../../layouts/SuperAdminLayout";
import { Container } from "@mui/material";

const ActiveAdminManagement = () => {
    return (
        <>
            <SuperAdminLayout>
                <Container maxWidth="xl" sx={{ mt: 8, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h1>Active Admin Management</h1>    
                </Container>
            </SuperAdminLayout>
        </>
    );
}

export default ActiveAdminManagement;