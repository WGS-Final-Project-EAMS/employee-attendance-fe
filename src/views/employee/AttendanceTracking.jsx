import { useState, useEffect } from 'react';
import { Container, Card, CardContent, Typography, Button, Box } from '@mui/material';
import EmployeeLayout from '../../layouts/EmployeeLayout';
import { fetchAttendanceStatus, clockIn, clockOut } from "../../services/attendanceService";
import ErrorMessage from '../../components/ErrorMessage';

const AttendanceTracking = () => {
    const [clockInTime, setClockInTime] = useState(null);
    const [clockOutTime, setClockOutTime] = useState(null);
    const [attendanceStatus, setAttendanceStatus] = useState(null);
    const [error, setError] = useState(null);  // State for managing errors

    useEffect(() => {
        const loadAttendanceStatus = async () => {
            try {
                const data = await fetchAttendanceStatus();
                setAttendanceStatus(data);
            } catch (error) {
                setError("Failed to fetch attendance status.");
                console.error("Error fetching attendance status:", error);
            }
        };

        loadAttendanceStatus();
    }, [clockInTime, clockOutTime]);

    const handleClockIn = async () => {
        try {
            const data = await clockIn();
            const { clock_in_time } = data;
            setClockInTime(new Date(clock_in_time).toLocaleTimeString());
            setError(null); // Clear any previous errors
        } catch (error) {
            setError(error.response?.data?.error || "Clock in failed.");
            console.error("Clock in failed:", error.response?.data?.error || error.message);
        }
    };

    const handleClockOut = async () => {
        try {
            const data = await clockOut();
            const { clock_out_time } = data;
            setClockOutTime(new Date(clock_out_time).toLocaleTimeString());
            setError(null); // Clear any previous errors
        } catch (error) {
            setError(error.response?.data?.error || "Clock out failed.");
            console.error("Clock out failed:", error.response?.data?.error || error.message);
        }
    };

    return (
        <EmployeeLayout>
            <Container maxWidth="xl" sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
                <Card sx={{ p: 4 }}>
                    <CardContent>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Attendance
                        </Typography>

                        {/* Display Error Message if any */}
                        {error && (
                            <Box sx={{ mb: 2 }}>
                                <ErrorMessage message={error} />
                            </Box>
                        )}

                        <Box sx={{ my: 4 }}>
                            {attendanceStatus === "clocked_out" ? (
                                <>
                                    <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
                                        You have already clocked out for today.
                                    </Typography>
                                </>
                            ) : (
                                <>
                                    <Typography variant="h6" color={clockInTime ? 'success.main' : 'warning.main'}>
                                        {clockInTime ? `Clock In Time: ${clockInTime}` : "You haven't clocked in yet."}
                                    </Typography>
                                </>
                            )}
                        </Box>

                        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                            {attendanceStatus === "no_clock_in" && (
                                <Button variant="contained" color="primary" onClick={handleClockIn} fullWidth>
                                    Clock In
                                </Button>
                            )}
                            {attendanceStatus === "clocked_in" && (
                                <Button variant="contained" color="warning" onClick={handleClockOut} fullWidth>
                                    Clock Out
                                </Button>
                            )}
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </EmployeeLayout>
    );
};

export default AttendanceTracking;