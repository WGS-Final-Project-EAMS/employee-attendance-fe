import { useState, useEffect } from "react";
import { Container, Typography, Box, Button, TextField, MenuItem } from "@mui/material";
import { Cached, Description } from "@mui/icons-material";
import AdminLayout from "../../layouts/AdminLayout";
import { fetchAttendanceRecap, fetchAttendanceRecapCSV } from "../../services/attendanceService";
import LoadingIndicator from "../../components/LoadingIndicator";
import ErrorMessage from "../../components/ErrorMessage";
import AttendanceRecapTable from "../../components/tables/AttendanceRecapTable";

const AttendanceRecap = () => {
    const [recaps, setRecaps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [period, setPeriod] = useState('monthly');
    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date);
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const title = "Attendance Recap";

    const loadRecaps = async () => {
        // console.log(`start date: ${startDate}, end date: ${endDate}`);
        
        try {
            const data = await fetchAttendanceRecap({ period, date, startDate, endDate, month, year });
            setError(null);
            setRecaps(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCSVDownload = async () => {
        try {
            const csvData = await fetchAttendanceRecapCSV({ period, date, month, year });
            const blob = new Blob([csvData], { type: 'text/csv' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `${month}-${year}-attendance-recap.csv`;
            link.click();
        } catch (error) {
            console.error("Error downloading CSV:", error);
        }
    };

    const formatDate = (date) => {
        // Is date valid
        const parsedDate = new Date(date);
        if (isNaN(parsedDate)) {
            return '';
        }
        
        return parsedDate.toISOString().split('T')[0];
    }

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Menambahkan 0 jika bulan hanya 1 digit
        const day = String(today.getDate()).padStart(2, '0'); // Menambahkan 0 jika tanggal hanya 1 digit
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        loadRecaps();
    }, [period, date, month, year]);

    return (
        <AdminLayout title={title}>
            <Container maxWidth="xl">
                <Typography component="h1" variant="h4" color="primary.dark">
                    {title}
                </Typography>
                
                {/* Filters */}
                <Box sx={{ display: 'flex', gap: 2, my: 4 }}>
                    <TextField
                        select
                        label="Period"
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        sx={{ width: 200 }}
                    >
                        <MenuItem value="daily">Daily</MenuItem>
                        <MenuItem value="monthly">Monthly</MenuItem>
                        <MenuItem value="period">Period</MenuItem>
                    </TextField>

                    {period === 'daily' && (
                        <TextField
                            label="Date"
                            type="date"
                            value={formatDate(date)}
                            onChange={(e) => setDate(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            sx={{ width: 200 }}
                            inputProps={{ max: getTodayDate() }}
                        />
                    )}

                    {period === 'monthly' && (
                        <>
                            <TextField
                                label="Month"
                                type="number"
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                sx={{ width: 120 }}
                            />
                            <TextField
                                label="Year"
                                type="number"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                sx={{ width: 120 }}
                            />
                        </>
                    )}

                    {period === 'period' && (
                        <>
                            <TextField
                                label="From"
                                type="date"
                                value={formatDate(startDate)}
                                onChange={(e) => setStartDate(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                                sx={{ width: 200 }}
                                inputProps={{ max: getTodayDate() }}
                            />
                            <TextField
                                label="To"
                                type="date"
                                value={formatDate(endDate)}
                                onChange={(e) => setEndDate(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                                sx={{ width: 200 }}
                                inputProps={{ max: getTodayDate() }}
                            />
                        </>
                    )}

                    <Button variant="contained" color="primary" startIcon={<Cached />} onClick={loadRecaps}>
                        Load Recap
                    </Button>
                    <Button variant="outlined" color="success" startIcon={<Description />} onClick={handleCSVDownload}>
                        Download CSV
                    </Button>
                </Box>

                {/* Table or Loading/Error Message */}
                <Box sx={{ my: 4 }}>
                    {loading ? (
                        <LoadingIndicator />
                    ) : error ? (
                        <ErrorMessage message={error} />
                    ) : recaps.length === 0 ? (
                        <Typography>No recaps found for the selected period.</Typography>
                    ) : (
                        <AttendanceRecapTable recaps={recaps} period={period} />
                    )}
                </Box>
            </Container>
        </AdminLayout>
    );
};

export default AttendanceRecap;