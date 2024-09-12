import { useState, useEffect } from 'react';
import { Container, Card, CardContent, Typography, Button, Box, Grid, Alert } from '@mui/material';
import EmployeeLayout from '../../layouts/EmployeeLayout';
import { fetchAttendanceStatus, fetchTodayAttendance, clockIn, clockOut } from "../../services/attendanceService";
import ErrorMessage from '../../components/ErrorMessage';
import DigitalClock from '../../components/elements/DigitalClock';

const AttendanceTracking = () => {
    const [clockInTime, setClockInTime] = useState(null);
    const [clockOutTime, setClockOutTime] = useState(null);
    const [attendanceStatus, setAttendanceStatus] = useState(null);
    const [error, setError] = useState(null);  // State for managing errors

    // Load attendance status
    const loadAttendanceStatus = async () => {
        try {
            const status = await fetchAttendanceStatus();
            setAttendanceStatus(status);

            // If user is clocked in, load clock in/out time
            if (status === 'clocked_in' || status === 'clocked_out') {
                await loadAttendanceTime();
            }
        } catch (error) {
            setError("Failed to fetch attendance status.");
            console.error("Error fetching attendance status:", error);
        }
    };

    // Load clock in/out time
    const loadAttendanceTime = async () => {
        try {
            const { clock_in_time, clock_out_time } = await fetchTodayAttendance();
            setClockInTime(clock_in_time ? new Date(clock_in_time).toLocaleTimeString() : null);
            setClockOutTime(clock_out_time ? new Date(clock_out_time).toLocaleTimeString() : null);
        } catch (error) {
            setError(error.response?.data?.message || "Failed to fetch attendance time.");
            console.error("Error fetching attendance time:", error.response?.data?.message || error.message);
        }
    };

    // Handle Clock In
    const handleClockIn = async () => {
        try {
            const data = await clockIn();
            const { clock_in_time } = data;
            setClockInTime(new Date(clock_in_time).toLocaleTimeString());
            setAttendanceStatus('clocked_in');
            setError(null); // Clear any previous errors
        } catch (error) {
            setError(error.response?.data?.error || "Clock in failed.");
            console.error("Clock in failed:", error.response?.data?.error || error.message);
        }
    };

    // Handle Clock Out
    const handleClockOut = async () => {
        try {
            const data = await clockOut();
            const { clock_out_time } = data;
            setClockOutTime(new Date(clock_out_time).toLocaleTimeString());
            setAttendanceStatus('clocked_out');
            setError(null); // Clear any previous errors
        } catch (error) {
            setError(error.response?.data?.error || "Clock out failed.");
            console.error("Clock out failed:", error.response?.data?.error || error.message);
        }
    };

    // Load attendance status on component mount
    useEffect(() => {
        loadAttendanceStatus();
    }, []);

    return (
        <EmployeeLayout>
            <Container maxWidth="xl" sx={{ mt: 8 }}>
                <Box>
                    <Card variant="outlined" sx={{ py: 4, px: 8 }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
                            <Typography variant="h4" component="h1" color="primary.dark" gutterBottom>
                                Attendance
                            </Typography>
                            <Box>
                                {attendanceStatus === "clocked_out" ? (
                                    <Grid item xs={12}>
                                        <Alert severity="success">
                                            You have already clocked out for today.
                                            {clockInTime && ` Clock In Time: ${clockInTime}`}
                                            {clockOutTime && ` Clock Out Time: ${clockOutTime}`}
                                        </Alert>
                                    </Grid>
                                ) : (
                                    <Grid item xs={12}>
                                        <Alert severity={clockInTime ? 'success' : 'warning'}>
                                            {clockInTime ? `Clock In Time: ${clockInTime}` : "You haven't clocked in yet."}
                                        </Alert>
                                    </Grid>
                                )}
                            </Box>
                            <DigitalClock />
                            {/* Display Error Message if any */}
                            {error && (
                                <Box sx={{ mb: 2 }}>
                                    <ErrorMessage message={error} />
                                </Box>
                            )}
                            <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                                {attendanceStatus === "no_clock_in" && (
                                    <Button variant="outlined" color="primary" size="large" onClick={handleClockIn} fullWidth>
                                        <Typography variant="h6" component="h1">
                                            Clock In
                                        </Typography>
                                    </Button>
                                )}
                                {attendanceStatus === "clocked_in" && (
                                    <Button variant="outlined" color="error" size="large" onClick={handleClockOut} fullWidth>
                                        <Typography variant="h6" component="h1">
                                            Clock Out
                                        </Typography>
                                    </Button>
                                )}
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        </EmployeeLayout>
    );
};

export default AttendanceTracking;
