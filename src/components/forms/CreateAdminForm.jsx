import { useState } from 'react';
import { FormControl, TextField, Button, Grid, Avatar, Typography, Alert } from '@mui/material';
import axios from 'axios';
import { token, urlEndpoint } from '../../services/url';
import { getCurrentUserId } from '../../services/auth';

const CreateAdminForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        role: 'admin',
        assigned_by: getCurrentUserId(),
        full_name: '',
        phone_number: '',
        profile_picture_url: null,
    });

    const [profilePicture, setProfilePicture] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleFileChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {   
            const data = new FormData();
            data.append('username', formData.username);
            data.append('email', formData.email);
            data.append('role', formData.role);
            data.append('assigned_by', formData.assigned_by);
            data.append('full_name', formData.full_name);
            data.append('phone_number', formData.phone_number);
            if (profilePicture) {
                data.append('profile_picture_url', profilePicture);
            }

            const response = await axios.post(`${urlEndpoint}/admin`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                },
            });

            if (response.status === 201) {
                setSuccessMessage('Admin created successfully!');
                
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
        } catch (error) {
            console.error('Failed to create admin:', error.response?.data || error.message);
            setSuccessMessage('Failed to create admin');
        }
    };

    return (
        <FormControl component="form" onSubmit={handleSubmit}>
            {/* Show success message */}
            {successMessage && (
                <Grid item sx={{ pb: 2 }} xs={12}>
                    <Alert severity={successMessage.includes('Failed') ? 'error' : 'success'}>
                        {successMessage}
                    </Alert>
                </Grid>
            )}
            <Grid container spacing={2} sx={{ p: 2, mb: 2 }}>
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            fullWidth
                            required
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
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Upload Profile Picture</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            component="label"
                            variant="outlined"
                            sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', gap: 2, py: 2 }}
                            color="secondary"
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
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Create Admin
            </Button>
        </FormControl>
    );
};

export default CreateAdminForm;