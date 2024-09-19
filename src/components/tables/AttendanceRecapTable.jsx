import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
} from "@mui/material";

const AttendanceRecapTable = ({ recaps, period }) => (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="attendance recap table">
            <TableHead sx={{ backgroundColor: 'primary.dark' }}>
                {period === 'monthly' &&
                    <TableRow>
                        <TableCell sx={{ color: 'primary.contrastText' }}>Full Name</TableCell>
                        <TableCell sx={{ color: 'primary.contrastText' }}>Department</TableCell>
                        <TableCell sx={{ color: 'primary.contrastText' }}>Position</TableCell>
                        <TableCell sx={{ color: 'primary.contrastText' }}>Total Days Present</TableCell>
                        <TableCell sx={{ color: 'primary.contrastText' }}>Total Days Absent</TableCell>
                        <TableCell sx={{ color: 'primary.contrastText' }}>Total Days Late</TableCell>
                        <TableCell sx={{ color: 'primary.contrastText' }}>Total Work Hours</TableCell>
                    </TableRow>
                }
                {period === 'daily' &&
                    <TableRow>
                        <TableCell sx={{ color: 'primary.contrastText' }}>Full Name</TableCell>
                        <TableCell sx={{ color: 'primary.contrastText' }}>Department</TableCell>
                        <TableCell sx={{ color: 'primary.contrastText' }}>Position</TableCell>
                        <TableCell sx={{ color: 'primary.contrastText' }}>Clock-in Time</TableCell>
                        <TableCell sx={{ color: 'primary.contrastText' }}>Clock-out Time</TableCell>
                        <TableCell sx={{ color: 'primary.contrastText' }}>Clock-in Location</TableCell>
                        <TableCell sx={{ color: 'primary.contrastText' }}>Status</TableCell>
                    </TableRow>
                }
            </TableHead>
            <TableBody>
                {period === 'monthly' &&
                    recaps.map((recap) => (
                        <TableRow key={recap.recap_id}>
                            <TableCell>{recap.employee.full_name}</TableCell>
                            <TableCell>{recap.employee.department}</TableCell>
                            <TableCell>{recap.employee.position}</TableCell>
                            <TableCell>{recap.total_days_present}</TableCell>
                            <TableCell>{recap.total_days_absent}</TableCell>
                            <TableCell>{recap.total_days_late}</TableCell>
                            <TableCell>{recap.total_work_hours}</TableCell>
                        </TableRow>
                    ))
                }
                {period === 'daily' &&
                    recaps.map((recap) => (
                        <TableRow key={recap.attendance_id}>
                            <TableCell>{recap.employee.full_name}</TableCell>
                            <TableCell>{recap.employee.department}</TableCell>
                            <TableCell>{recap.employee.position}</TableCell>
                            <TableCell>{new Date(recap.clock_in_time).toLocaleTimeString()}</TableCell>
                            <TableCell>{new Date(recap.clock_out_time).toLocaleTimeString()}</TableCell>
                            <TableCell>{recap.clock_in_location}</TableCell>
                            <TableCell>{recap.status}</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </TableContainer>
);

export default AttendanceRecapTable;