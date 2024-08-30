import { useState } from 'react';
import { FormControl, TextField, Button, Grid, Avatar, Typography } from '@mui/material';

const CreateEmployeeForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        username: '',
        role: 'admin',
        email: '',
        assigned_by: '',
        full_name: '',
        phone_number: '',
        profile_picture_url: '',
    });

    const [profilePicture, setProfilePicture] = useState(null);

    const handleFileChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <FormControl onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ p:2, mb:2 }}>
                <Grid container direction='row' spacing={2}>
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
                            variant='outlined'
                            sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', gap: 2, py:2 }}
                            color='secondary'
                        >
                            <Avatar
                                alt="Profile Picture"
                                src={formData.profile_picture_url}
                                sx={{ width: 56, height: 56 }}
                            />
                            <Typography variant="subtitle1">Choose Proflie Picture</Typography>
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
                Create Employee
            </Button>
        </FormControl>
    );
};

export default CreateEmployeeForm;