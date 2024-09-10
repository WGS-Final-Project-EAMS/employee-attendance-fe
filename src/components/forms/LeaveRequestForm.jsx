import { useState } from 'react';
import {
    FormControl, TextField, Grid, Typography, Alert, Select, InputLabel, MenuItem
} from '@mui/material';
import { createLeaveRequest } from '../../services/leaveRequestService';
import SubmitButton from '../elements/SubmitButton';

const LeaveRequestForm = () => {
    const [formData, setFormData] = useState({
        leave_type: '',
        start_date: '',
        end_date: '',
        leave_reason: '',
    });

    const [leaveTypeError, setLeaveTypeError] = useState('');
    const [startDateError, setStartDateError] = useState('');
    const [endDateError, setEndDateError] = useState('');
    const [reasonError, setReasonError] = useState('');
    const [generalError, setGeneralError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear previous errors
        setLeaveTypeError('');
        setStartDateError('');
        setEndDateError('');
        setReasonError('');
        setGeneralError('');
        setSuccessMessage('');

        setLoading(true); // Submitting
        const { success, error } = await createLeaveRequest(formData);

        if (success) {
            setLoading(false);
            setSuccessMessage('Leave request submitted successfully!');
            // Reset form after success
            setFormData({
                leave_type: '',
                start_date: '',
                end_date: '',
                leave_reason: '',
            });
        } else {
            setLoading(false);
            if (error.leave_type) setLeaveTypeError(error.leave_type);
            if (error.start_date) setStartDateError(error.start_date);
            if (error.end_date) setEndDateError(error.end_date);
            if (error.leave_reason) setReasonError(error.leave_reason);
            if (error.general) setGeneralError(error.general);
        }
    };

    return (
        <FormControl component="form" onSubmit={handleSubmit}>
            {generalError && (
                <Grid item sx={{ pb: 2 }} xs={12}>
                    <Alert severity="error">{generalError}</Alert>
                </Grid>
            )}
            {successMessage && (
                <Grid item sx={{ pb: 2 }} xs={12}>
                    <Alert severity="success">{successMessage}</Alert>
                </Grid>
            )}
            <Grid container spacing={2} sx={{ p: 2, mb: 2 }}>
                <Grid item xs={12} sm={12}>
                    <FormControl fullWidth>
                        <InputLabel id="leave-type-select-label">Leave Type</InputLabel>
                        <Select
                            labelId="leave-type-select-label"
                            id="leave-type-select"
                            name="leave_type"
                            label="Leave Type"
                            value={formData.leave_type}
                            onChange={handleChange}
                            required
                            error={!!leaveTypeError}
                        >
                            <MenuItem value="annual">Annual Leave</MenuItem>
                            <MenuItem value="sick">Sick Leave</MenuItem>
                            <MenuItem value="wfh">Work From Home</MenuItem>
                        </Select>
                        {leaveTypeError && <Typography color="error">{leaveTypeError}</Typography>}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Start Date"
                        name="start_date"
                        type="date"
                        value={formData.start_date}
                        onChange={handleChange}
                        fullWidth
                        required
                        InputLabelProps={{ shrink: true }}
                        error={!!startDateError}
                        helperText={startDateError}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="End Date"
                        name="end_date"
                        type="date"
                        value={formData.end_date}
                        onChange={handleChange}
                        fullWidth
                        required
                        InputLabelProps={{ shrink: true }}
                        error={!!endDateError}
                        helperText={endDateError}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Reason"
                        name="leave_reason"
                        value={formData.leave_reason}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={4}
                        required
                        error={!!reasonError}
                        helperText={reasonError}
                    />
                </Grid>
            </Grid>
            <SubmitButton loading={loading} text="Submit Leave Request" />
        </FormControl>
    );
};

export default LeaveRequestForm;