import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const AttendanceTable = ({ attendanceHistory }) => (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="attendance history table">
            <TableHead sx={{ backgroundColor: 'primary.dark' }}>
                <TableRow>
                    <TableCell sx={{ color: 'primary.contrastText' }}>Date</TableCell>
                    <TableCell sx={{ color: 'primary.contrastText' }}>Clock In Time</TableCell>
                    <TableCell sx={{ color: 'primary.contrastText' }}>Clock Out Time</TableCell>
                    <TableCell sx={{ color: 'primary.contrastText' }}>Status</TableCell>
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
);

export default AttendanceTable;
