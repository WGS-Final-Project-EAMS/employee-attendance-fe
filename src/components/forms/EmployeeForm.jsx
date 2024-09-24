import { useState, useEffect } from 'react';
import {
    FormControl, TextField, Button, Grid, Avatar, Typography, Alert,
    FormControlLabel, Switch, Select, InputLabel, MenuItem
} from '@mui/material';
import { token } from '../../services/url';
import { createEmployee, updateEmployee, fetchEmployee } from '../../services/employeeService';
import { urlEndpoint } from '../../services/url';
import SubmitButton from '../elements/SubmitButton';
import FormTextField from '../elements/FormTextField';
import FormSelect from '../elements/FormSelect';
import SwitchField from '../elements/SwitchField';
import FileUploadField from '../elements/FormUploadField';

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
    const [loading, setLoading] = useState(false);

    const fetchEmployeeOptions = async () => {
        try {
            const employees = await fetchEmployee();
            return employees.map(employee => ({
                value: employee.employee_id,
                label: employee.user?.full_name,
            }));
        } catch (error) {
            console.error("Failed to fetch employees for manager select", error);
            return [];
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

    // Load manager for manager options
    const loadManagerOptions = async () => {
        const options = await fetchEmployeeOptions();
        setManagerOptions(options);
    };

    // Load employee for initial form
    const loadEmployee = async () => {
        // Only for edit form
        if (mode === 'edit' && employeeData) {
            const avatarUrl = `${urlEndpoint}/${employeeData.user?.profile_picture_url}`;

            setFormData({
                user_id: employeeData.user_id || '',
                employee_id: employeeData.employee_id || '',
                full_name: employeeData.user?.full_name || '',
                position: employeeData.position || '',
                department: employeeData.department || '',
                phone_number: employeeData.user?.phone_number || '',
                manager_id: employeeData.manager_id || '',
                employment_date: employeeData.employment_date || '',
                username: employeeData.user?.username || '',
                email: employeeData.user?.email || '',
                profile_picture_url: avatarUrl || null,
                is_active: employeeData.user?.is_active || false,
            });

            setProfilePicture(null); // Reset profile picture state
        }
    }

    useEffect(() => {
        loadManagerOptions();
    }, []);

    useEffect(() => {
        loadEmployee();
    }, [])

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
        
        setLoading(true); // Submitting
        const { success, error } = await serviceFunction(formData, profilePicture, token);

        if (success) {
            setLoading(false);
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
            setLoading(false);
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
            <Grid container spacing={2} sx={{ px: 2, pt:2 }}>
                <FormTextField 
                    label="Full Name" 
                    name="full_name" 
                    value={formData.full_name} 
                    onChange={handleChange} 
                    error={fullNameError} 
                />
                <FormTextField 
                    label="Position" 
                    name="position" 
                    value={formData.position} 
                    onChange={handleChange} 
                    error={positionError} 
                />
                <FormTextField 
                    label="Department" 
                    name="department" 
                    value={formData.department} 
                    onChange={handleChange} 
                    error={departmentError} 
                />
                <FormTextField 
                    label="Phone Number" 
                    name="phone_number" 
                    value={formData.phone_number} 
                    onChange={handleChange} 
                    error={phoneNumberError} 
                />
                <FormSelect
                    label="Supervisor"
                    name="manager"
                    value={formData.manager_id}
                    onChange={(event) => setFormData({ ...formData, manager_id: event.target.value })}
                    options={managerOptions}
                />
                <FormTextField 
                    label="Employement Date" 
                    name="employment_date" 
                    value={formatDate(formData.employment_date)} 
                    onChange={handleChange} 
                    type="date" 
                    InputLabelProps={{ shrink: true }} 
                />
                <FormTextField 
                    label="Username" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    error={usernameError} 
                />
                <FormTextField 
                    label="Email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    error={emailError} 
                    type="email" 
                />
                {mode === 'edit' && (
                    <SwitchField 
                        isActive={formData.is_active} 
                        handleSwitchChange={handleSwitchChange} 
                    />
                )}
                <FileUploadField
                    profilePicture={profilePicture}
                    handleFileChange={handleFileChange}
                    profilePictureUrl={formData.profile_picture_url}
                />
            </Grid>
            <SubmitButton loading={loading} text={mode === 'create' ? 'Create Employee' : 'Update Employee'} />
        </FormControl>
    );
};

export default EmployeeForm;