import { useState } from 'react';
import { Container, Box, Typography, Button, Card, CardContent } from '@mui/material';
import EmployeeLayout from '../../layouts/EmployeeLayout';

const AttendanceTracking = () => {
    const [clockInTime, setClockInTime] = useState(null);
    const [clockOutTime, setClockOutTime] = useState(null);

    const handleClockIn = () => {
        const now = new Date().toLocaleTimeString();
        setClockInTime(now);
    };

    const handleClockOut = () => {
        const now = new Date().toLocaleTimeString();
        setClockOutTime(now);
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
                            <Typography variant="h6" color="success.main">
                                {clockInTime ? `Clock In Time: ${clockInTime}` : "You haven't clocked in yet."}
                            </Typography>
                            {clockOutTime && (
                                <Typography variant="h6" color="warning.main" sx={{ mt: 2 }}>
                                    Clock Out Time: {clockOutTime}
                                </Typography>
                            )}
                        </Box>

                        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                            {!clockInTime && (
                                <Button variant="contained" color="primary" onClick={handleClockIn} fullWidth>
                                    Clock In
                                </Button>
                            )}
                            {clockInTime && !clockOutTime && (
                                <Button variant="contained" color="secondary" onClick={handleClockOut} fullWidth>
                                    Clock Out
                                </Button>
                            )}
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </EmployeeLayout>
    );
}

export default AttendanceTracking;