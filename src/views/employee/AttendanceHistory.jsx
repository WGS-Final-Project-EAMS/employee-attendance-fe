import { useState, useEffect } from "react";
// import EmployeeLayout from "../../layouts/EmployeeLayout";
import { fetchAttendanceHistory } from "../../services/attendanceService";
import {
    Container,
    Typography,
    Box,
} from "@mui/material";
import AttendanceTable from "../../components/AttendanceTable";
import LoadingIndicator from "../../components/LoadingIndicator";
import ErrorMessage from "../../components/ErrorMessage";

const AttendanceHistory = () => {
    const [attendanceHistory, setAttendanceHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const title = "Attendance History";

    useEffect(() => {
        const loadAttendanceHistory = async () => {
            try {
                const data = await fetchAttendanceHistory(); // Get attendance history data
                setAttendanceHistory(data);
            } catch (error) {
                setError("Failed to fetch attendance history.");
                console.error("Error fetching attendance history:", error);
            } finally {
                setLoading(false); // Loading false if fetching successful
            }
        };

        loadAttendanceHistory();
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
                ) : attendanceHistory.length === 0 ? (
                    <Typography>No attendance history found.</Typography>
                ) : (
                    <AttendanceTable attendanceHistory={attendanceHistory} />
                )}
            </Box>
        </Container>
        // <EmployeeLayout title={title}>
        // </EmployeeLayout>
    );
};

export default AttendanceHistory;
