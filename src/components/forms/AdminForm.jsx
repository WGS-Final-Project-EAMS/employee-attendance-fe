import { useState, useEffect } from 'react';
import {
    FormControl, TextField, Button, Grid, Avatar, Typography, Alert,
    FormControlLabel, Switch,
 } from '@mui/material';
import { token } from '../../services/url';
import { getCurrentUserId } from '../../services/auth';
import { createAdmin, updateAdmin } from '../../services/adminService';
import { urlEndpoint } from '../../services/url';

const AdminForm = ({ mode = 'create', adminData = {} }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        role: 'admin',
        assigned_by: getCurrentUserId(),
        full_name: '',
        phone_number: '',
        profile_picture_url: null,
        is_active: false,
    });
    

    const [profilePicture, setProfilePicture] = useState(null);
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [fullNameError, setFullNameError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [generalError, setGeneralError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (mode === 'edit' && adminData) {
            const avatarUrl = `${urlEndpoint}/${adminData.profile_picture_url}`;

            setFormData({
                user_id: adminData.user_id || '',
                admin_id: adminData.admin_id || '',
                username: adminData.user.username || '',
                email: adminData.user.email || '',
                role: adminData.role || 'admin',
                assigned_by: adminData.assigned_by || '',
                full_name: adminData.full_name || '',
                phone_number: adminData.phone_number || '',
                profile_picture_url: avatarUrl || null,
                is_active: adminData.is_active || false, // Add this line
            });
            
            setProfilePicture(null); // Reset profile picture state
        }
    }, [mode, adminData]);

    const handleFileChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSwitchChange = (event) => {
        setFormData({
            ...formData,
            is_active: event.target.checked,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear previous errors
        setUsernameError('');
        setEmailError('');
        setFullNameError('');
        setPhoneNumberError('');
        setGeneralError('');
        setSuccessMessage('');

        const serviceFunction = mode === 'create' ? createAdmin : updateAdmin;
        const { success, error } = await serviceFunction(formData, profilePicture, token);

        if (success) {
            setSuccessMessage(`Admin ${mode === 'create' ? 'created' : 'updated'} successfully!`);
            if (mode === 'create') {
                // Reset form after success
                setFormData({
                    username: '',
                    email: '',
                    role: 'admin',
                    assigned_by: getCurrentUserId(),
                    full_name: '',
                    phone_number: '',
                    profile_picture_url: null,
                });
                setProfilePicture(null);
            }
        } else {
            if (error.username) setUsernameError(error.username);
            if (error.email) setEmailError(error.email);
            if (error.full_name) setFullNameError(error.full_name);
            if (error.phone_number) setPhoneNumberError(error.phone_number);
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
                <Grid item xs={12}>
                    <TextField
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        fullWidth
                        required
                        error={!!usernameError}
                        helperText={usernameError}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        required
                        error={!!emailError}
                        helperText={emailError}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Full Name"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        fullWidth
                        required
                        error={!!fullNameError}
                        helperText={fullNameError}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Phone Number"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        fullWidth
                        required
                        error={!!phoneNumberError}
                        helperText={phoneNumberError}
                    />
                </Grid>
                {mode === 'edit' &&
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.is_active}
                                    onChange={handleSwitchChange}
                                    color="primary"
                                />
                            }
                            label={formData.is_active ? 'active' : 'non-active'}
                        />
                    </Grid>
                }
                <Grid item xs={12}>
                    <Typography variant="h6">Upload Profile Picture</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        component="label"
                        variant='outlined'
                        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', gap: 2, py: 2 }}
                        color='secondary'
                    >
                        <Avatar
                            alt="Profile Picture"
                            src={profilePicture ? URL.createObjectURL(profilePicture) : formData.profile_picture_url}
                            sx={{ width: 56, height: 56 }}
                        />
                        <Typography variant="subtitle1">Choose Profile Picture</Typography>
                        <input
                            type="file"
                            hidden
                            accept="image/jpeg, image/png, image/webp"
                            onChange={handleFileChange}
                        />
                    </Button>
                </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="primary" fullWidth>
                {mode === 'create' ? 'Create Admin' : 'Update Admin'}
            </Button>
        </FormControl>
    );
};

export default AdminForm;