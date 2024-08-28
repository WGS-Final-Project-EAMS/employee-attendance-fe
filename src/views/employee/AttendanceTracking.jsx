import { useState, useEffect } from 'react';
import { Container, Card, CardContent, Typography, Button, Box } from '@mui/material';
import EmployeeLayout from '../../layouts/EmployeeLayout'; // Asumsikan ini adalah layout karyawan
import axios from 'axios';
import { token, urlEndpoint } from "../../services/url";

const AttendanceTracking = () => {
    const [clockInTime, setClockInTime] = useState(null);
    const [clockOutTime, setClockOutTime] = useState(null);
    const [attendanceStatus, setAttendanceStatus] = useState(null);

    useEffect(() => {
        // Fetch attendance status on mount
        const fetchAttendanceStatus = async () => {
            try {
                const response = await axios.get(`${urlEndpoint}/attendance-status`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAttendanceStatus(response.data.status);
            } catch (error) {
                console.error("Error fetching attendance status:", error);
            }
        };

        fetchAttendanceStatus();
    }, [clockInTime, clockOutTime]);

    const handleClockIn = async () => {
        try {
            const response = await axios.post(
                `${urlEndpoint}/clock-in`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            const { clock_in_time } = response.data.attendance;
            setClockInTime(new Date(clock_in_time).toLocaleTimeString());
        } catch (error) {
            console.error("Clock in failed: ", error.response?.data?.error || error.message);
            // Handle error appropriately (e.g., show a notification)
        }
    };

    const handleClockOut = async () => {
        try {
            const response = await axios.post(
                `${urlEndpoint}/clock-out`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const { clock_out_time } = response.data.updatedAttendance;
            setClockOutTime(new Date(clock_out_time).toLocaleTimeString());
        } catch (error) {
            console.error("Clock out failed: ", error.response?.data?.error || error.message);
            // Handle error appropriately (e.g., show a notification)
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
                        <Box sx={{ my: 4 }}>
                            {attendanceStatus === "clocked_out" ? (
                                <>
                                    <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
                                        You have already clocked out for today.
                                    </Typography>
                                </>
                            ) : (
                                <>
                                    <Typography variant="h6" color={clockInTime? 'success.main': 'warning.main'}>
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