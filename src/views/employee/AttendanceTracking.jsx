import { useState, useEffect } from 'react';
import { Container, Card, CardContent, Typography, Button, Box, Grid, Alert } from '@mui/material';
import { LocalFireDepartment, AccessTime } from '@mui/icons-material';
import EmployeeLayout from '../../layouts/EmployeeLayout';
import { fetchAttendanceStatus, fetchTodayAttendance, clockIn, clockOut } from "../../services/attendanceService";
import { fetchOfficeSettings } from '../../services/officeSettingsService';
import { fetchStreakByUserId } from '../../services/streakService';
import ErrorMessage from '../../components/ErrorMessage';
import DigitalClock from '../../components/elements/DigitalClock';

const AttendanceTracking = () => {
    const [clockInTime, setClockInTime] = useState(null);
    const [clockOutTime, setClockOutTime] = useState(null);
    const [attendanceStatus, setAttendanceStatus] = useState(null);
    const [streak, setStreak] = useState(null);
    const [error, setError] = useState(null);
    const [officeStartTime, setOfficeStartTime] = useState(null); // State for office start time
    const [lateAlert, setLateAlert] = useState(false); // State for late alert

    // Load office settings to get start time
    const loadOfficeSettings = async () => {
        try {
            const { office_start_time } = await fetchOfficeSettings();
            setOfficeStartTime(office_start_time);
        } catch (error) {
            setError("Failed to fetch office settings.");
            console.error("Error fetching office settings:", error);
        }
    };

    // Load attendance status
    const loadAttendanceStatus = async () => {
        try {
            const status = await fetchAttendanceStatus();
            setAttendanceStatus(status);

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

    // Load current streak
    const loadCurrentStreak = async () => {
        try {
            const { current_streak } = await fetchStreakByUserId();
            setStreak(current_streak);

        } catch (error) {
            setError(error.response?.data?.message || "Failed to fetch current streak.");
            console.error("Error fetching current streak:", error.response?.data?.message || error.message);
        }
    }

    // Handle Clock In
    const handleClockIn = async () => {
        try {
            const data = await clockIn();
            const { clock_in_time } = data;
            setClockInTime(new Date(clock_in_time).toLocaleTimeString());
            setAttendanceStatus('clocked_in');
            setError(null); // Clear any previous errors
            loadCurrentStreak();
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

    // Check if employee is late
    useEffect(() => {
        if (officeStartTime) {
            const currentTime = new Date();
            const [hours, minutes] = officeStartTime.split(':');
            const officeTime = new Date();
            officeTime.setHours(hours, minutes, 0, 0);

            if (currentTime > officeTime && attendanceStatus !== 'clocked_in') {
                setLateAlert(true);
            }
        }
    }, [officeStartTime, attendanceStatus]);

    // Load office settings and attendance status on component mount
    useEffect(() => {
        loadOfficeSettings();
        loadAttendanceStatus();
        loadCurrentStreak();
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
                                        </Alert>
                                    </Grid>
                                ) : (
                                    <Grid item xs={12}>
                                        <Alert severity={clockInTime ? 'success' : 'warning'}>
                                            {clockInTime ? `Clock In Time: ${clockInTime}` : "You haven't clocked in yet."}
                                        </Alert>
                                    </Grid>
                                )}
                                {lateAlert && attendanceStatus === "no_clock_in" && (
                                    <Grid item xs={12}>
                                        <Alert severity="error">
                                            You are late! Please clock in as soon as possible.
                                        </Alert>
                                    </Grid>
                                )}
                            </Box>
                            <DigitalClock />
                            {error && (
                                <Box sx={{ mb: 2 }}>
                                    <ErrorMessage message={error} />
                                </Box>
                            )}
                            <Typography sx={{ textAlign:'center' }} variant="h6" component="h1" color="warning.dark" gutterBottom>
                                <LocalFireDepartment /> Current streak: {streak ? streak : 'no streak yet'}
                            </Typography>
                            <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                                {attendanceStatus === "no_clock_in" && (
                                    <Button variant="outlined" color="primary" size="large" startIcon={<AccessTime sx={{ fontSize: 24 }} />} onClick={handleClockIn} fullWidth>
                                        <Typography variant="h6" component="h1">
                                            Clock In
                                        </Typography>
                                    </Button>
                                )}
                                {attendanceStatus === "clocked_in" && (
                                    <Button variant="outlined" color="error" size="large" startIcon={<AccessTime sx={{ fontSize: 24 }} />} onClick={handleClockOut} fullWidth>
                                        <Typography variant="h6" component="h1">
                                            Clock Out
                                        </Typography>
                                    </Button>
                                )}
                            </Box>
                            {clockInTime && attendanceStatus === "clocked_out" && (
                                <Typography sx={{ textAlign:'center', pt:2 }} variant="body1" component="h1" color="success.main" gutterBottom>
                                    <Box sx={{ display:'flex', justifyContent:'center', gap:1 }}>
                                        <AccessTime sx={{ fontSize: 24 }} /> {clockInTime && `\n Clock In Time: ${clockInTime}`}
                                    </Box>
                                </Typography>
                            )}
                            {clockOutTime && attendanceStatus === "clocked_out" && (
                                <Typography sx={{ textAlign:'center', pt:2 }} variant="body1" component="h1" color="secondary.main" gutterBottom>
                                    <Box sx={{ display:'flex', justifyContent:'center', gap:1 }}>
                                        <AccessTime sx={{ fontSize: 24 }} /> {clockOutTime && `\n Clock Out Time: ${clockOutTime}`}
                                    </Box>
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        </EmployeeLayout>
    );
};

export default AttendanceTracking;
