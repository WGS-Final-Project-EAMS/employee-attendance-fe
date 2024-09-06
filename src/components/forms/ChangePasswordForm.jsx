import { useState } from 'react';
import { Box, TextField, Typography, Alert, Grid } from '@mui/material';
import { changePassword } from '../../services/auth';
import SubmitButton from '../elements/SubmitButton';

const ChangePasswordForm = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset error states
        setError('');
        setSuccessMessage('');

        setLoading(true);

        // Validasi input
        if (!newPassword || !confirmPassword) {
            setError('Both fields are required');
            setLoading(false);
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {

            // Panggil service untuk mengubah password
            const response = await changePassword(newPassword, confirmPassword);
            
            // Periksa apakah berhasil
            if (response.status === 200) {
                setLoading(false);
                setSuccessMessage(response.data.message);
            } else {
                setLoading(false);
                setError(response.error);
            }
        } catch (error) {
            setLoading(false);
            setError('An error occurred while changing the password');
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >

            {error && (
                <Grid item sx={{ pb: 2 }} xs={12}>
                    <Alert severity="error">{error}</Alert>
                </Grid>
            )}
            {successMessage && (
                <Grid item sx={{ pb: 2 }} xs={12}>
                    <Alert severity="success">{successMessage}</Alert>
                </Grid>
            )}

            <TextField
                label="New Password"
                type="password"
                fullWidth
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />

            <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <SubmitButton loading={loading} text="Change Password" />
        </Box>
    );
};

export default ChangePasswordForm;