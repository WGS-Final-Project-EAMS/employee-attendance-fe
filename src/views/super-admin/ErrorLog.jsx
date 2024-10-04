import { useState, useEffect } from "react";
// import SuperAdminLayout from "../../layouts/SuperAdminLayout";
import { fetchErrorLog } from "../../services/errorService";
import {
    Container,
    Typography,
    Box,
} from "@mui/material";
import ErrorLogTable from "../../components/ErrorLogTable";
import LoadingIndicator from "../../components/LoadingIndicator";
import ErrorMessage from "../../components/ErrorMessage";

const ErrorLog = () => {
    const [errorLog, setErrorLog] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const title = "Error Log";

    const loadErrorLog = async () => {
        try {
            const data = await fetchErrorLog(); // Get attendance history data
            
            setErrorLog(data.errorLogs);
        } catch (error) {
            setError("Failed to fetch error log.");
            console.error("Error fetching error log:", error);
        } finally {
            setLoading(false); // Loading false if fetching successful
        }
    };

    useEffect(() => {
        loadErrorLog();
    }, []);

    return (
        <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {/* Header */}
            <Typography variant="h4" component="h1" gutterBottom>
                {title}
            </Typography>
            
            {/* Main Content */}
            <Box sx={{ my: 4, mt: 4 }}>
                {loading ? (
                    <LoadingIndicator />
                ) : error ? (
                    <ErrorMessage message={error} />
                ) : errorLog.length === 0 ? (
                    <Typography>No error log found.</Typography>
                ) : (
                    <ErrorLogTable errorLog={errorLog} loadErrorLog={loadErrorLog} />
                )}
            </Box>
        </Container>
        // <SuperAdminLayout title={title}>
        // </SuperAdminLayout>
    );
};

export default ErrorLog;
