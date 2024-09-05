import { useState, useEffect } from 'react';
import {
    FormControl, TextField, Button, Grid, Avatar, Typography, Alert,
    FormControlLabel, Switch, Select, InputLabel, MenuItem
} from '@mui/material';
import { token } from '../../services/url';
import { createEmployee, updateEmployee, fetchEmployee } from '../../services/employeeService';
import { urlEndpoint } from '../../services/url';

const EmployeeForm = ({ mode = 'create', employeeData = {} }) => {
    const [formData, setFormData] = useState({
        full_name: '',
        position: '',
        department: '',
        phone_number: '',
        manager_id: '',
        employment_date: '',
        username: '',
        email: '',
        profile_picture_url: null,
        is_active: false,
    });

    const [profilePicture, setProfilePicture] = useState(null);
    const [fullNameError, setFullNameError] = useState('');
    const [positionError, setPositionError] = useState('');
    const [managerOptions, setManagerOptions] = useState([]);
    const [departmentError, setDepartmentError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [generalError, setGeneralError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const fetchEmployeeOptions = async () => {
        try {
            const employees = await fetchEmployee();
            return employees.map(employee => ({
                value: employee.employee_id,
                label: employee.full_name,
            }));
        } catch (error) {
            console.error("Failed to fetch employees for manager select", error);
            return [];
        }
    };

    const loadManagerOptions = async () => {
        const options = await fetchEmployeeOptions();
        setManagerOptions(options);
    };

    useEffect(() => {
        loadManagerOptions();
        if (mode === 'edit' && employeeData) {
            const avatarUrl = `${urlEndpoint}/${employeeData.profile_picture_url}`;

            const formattedEmploymentDate = employeeData.employment_date
            ? new Date(employeeData.employment_date).toISOString().split('T')[0]
            : '';

            setFormData({
                user_id: employeeData.user_id || '',
                employee_id: employeeData.employee_id || '',
                full_name: employeeData.full_name || '',
                position: employeeData.position || '',
                department: employeeData.department || '',
                phone_number: employeeData.phone_number || '',
                manager_id: employeeData.manager_id || '',
                employment_date: formattedEmploymentDate || '',
                username: employeeData.user?.username || '',
                email: employeeData.user?.email || '',
                profile_picture_url: avatarUrl || null,
                is_active: employeeData.user?.is_active || false,
            });

            setProfilePicture(null); // Reset profile picture state
        }
    }, [mode, employeeData]);

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
        setFullNameError('');
        setPositionError('');
        setDepartmentError('');
        setPhoneNumberError('');
        setUsernameError('');
        setEmailError('');
        setGeneralError('');
        setSuccessMessage('');

        const serviceFunction = mode === 'create' ? createEmployee : updateEmployee;
        const { success, error } = await serviceFunction(formData, profilePicture, token);

        if (success) {
            setSuccessMessage(`Employee ${mode === 'create' ? 'created' : 'updated'} successfully!`);
            if (mode === 'create') {
                // Reset form after success
                setFormData({
                    full_name: '',
                    position: '',
                    department: '',
                    phone_number: '',
                    manager_id: '',
                    employment_date: '',
                    username: '',
                    email: '',
                    profile_picture_url: null,
                    is_active: false,
                });
                setProfilePicture(null);
            }
        } else {
            if (error.full_name) setFullNameError(error.full_name);
            if (error.position) setPositionError(error.position);
            if (error.department) setDepartmentError(error.department);
            if (error.phone_number) setPhoneNumberError(error.phone_number);
            if (error.username) setUsernameError(error.username);
            if (error.email) setEmailError(error.email);
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
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Position"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        fullWidth
                        required
                        error={!!positionError}
                        helperText={positionError}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        fullWidth
                        required
                        error={!!departmentError}
                        helperText={departmentError}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id="manager-select-label">Manager</InputLabel>
                        <Select
                            labelId="manager-select-label"
                            id="manager-select"
                            label="Manager"
                            value={formData.manager_id}
                            onChange={(event) => setFormData({ ...formData, manager_id: event.target.value })}
                        >
                            {managerOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Employment Date"
                        name="employment_date"
                        type="date"
                        value={formData.employment_date}
                        onChange={handleChange}
                        fullWidth
                        required
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
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
                {mode === 'edit' && (
                    <Grid item xs={12} sm={6}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.is_active}
                                    onChange={handleSwitchChange}
                                    color="primary"
                                />
                            }
                            label={formData.is_active ? 'Active' : 'Non-active'}
                        />
                    </Grid>
                )}
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
                {mode === 'create' ? 'Create Employee' : 'Update Employee'}
            </Button>
        </FormControl>
    );
};

export default EmployeeForm;