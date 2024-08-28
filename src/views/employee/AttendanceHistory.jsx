import { useState, useEffect } from "react";
import axios from "axios";
import EmployeeLayout from "../../layouts/EmployeeLayout";
import { token, urlEndpoint } from "../../services/url";
import {
    Container,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

const AttendanceHistory = () => {
    const [attendanceHistory, setAttendanceHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAttendanceHistory = async () => {
            try {
                const response = await axios.get(`${urlEndpoint}/attendance-history`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAttendanceHistory(response.data);
            } catch (error) {
                setError("Failed to fetch attendance history.");
                console.error("Error fetching attendance history:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAttendanceHistory();
    }, []);

    return (
        <EmployeeLayout>
            <Container maxWidth="xl" sx={{ mt: 8, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Attendance History
                </Typography>
                <Box sx={{ my: 4, mt:4 }}>
                    {loading ? (
                        <Typography>Loading...</Typography>
                    ) : error ? (
                        <Typography color="error">{error}</Typography>
                    ) : attendanceHistory.length === 0 ? (
                        <Typography>No attendance history found.</Typography>
                    ) : (
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="attendance history table">
                                <TableHead sx={{ backgroundColor:'primary.dark' }}>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Clock In Time</TableCell>
                                        <TableCell>Clock Out Time</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {attendanceHistory.map((record) => (
                                        <TableRow key={record.attendance_id}>
                                            <TableCell>
                                                {new Date(record.date).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>
                                                {new Date(record.clock_in_time).toLocaleTimeString()}
                                            </TableCell>
                                            <TableCell>
                                                {record.clock_out_time
                                                    ? new Date(record.clock_out_time).toLocaleTimeString()
                                                    : "Not yet clocked out"}
                                            </TableCell>
                                            <TableCell>{record.status}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Box>
                {/* <Card sx={{ p: 4, width: '100%' }}>
                    <CardContent>
                    </CardContent>
                </Card> */}
            </Container>
        </EmployeeLayout>
    );
};

export default AttendanceHistory;
