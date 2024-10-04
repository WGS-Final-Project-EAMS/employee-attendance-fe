import { useState, useEffect } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
// import EmployeeLayout from "../../layouts/EmployeeLayout";
import { fetchPermissionApproval } from "../../services/leaveRequestService";
import PermissionApprovalTable from "../../components/PermissionApprovalTable";
import LoadingIndicator from "../../components/LoadingIndicator";
import ErrorMessage from "../../components/ErrorMessage";

const PermissionApproval = () => {
    const [approval, setApproval] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const title = "Leave Request Approval";

    const loadPermissionApproval = async () => {
        try {
            const data = await fetchPermissionApproval(); // Get attendance history data
            
            setApproval(data);
        } catch (error) {
            setError("Failed to fetch attendance history.");
            console.error("Error fetching attendance history:", error);
        } finally {
            setLoading(false); // Loading false if fetching successful
        }
    }

    useEffect(() => {
        loadPermissionApproval();
    }, []);

    return (
        <>
            <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography component="h1" variant="h4" color="primary.dark">
                    {title}
                </Typography>
                {/* Main Content */}
                <Box sx={{ my: 4, mt: 4 }}>
                    {loading ? (
                        <LoadingIndicator />
                    ) : error ? (
                        <ErrorMessage message={error} />
                    ) : approval.length === 0 ? (
                        <Typography>No permission found.</Typography>
                    ) : (
                        <PermissionApprovalTable leaveRequests={approval} loadLeaveRequests={loadPermissionApproval} />
                    )}
                </Box>
            </Container>
            {/* <EmployeeLayout title={title}>
            </EmployeeLayout> */}
        </>
    );
}

export default PermissionApproval;