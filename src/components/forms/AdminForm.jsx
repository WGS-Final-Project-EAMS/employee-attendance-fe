import { useState, useEffect } from 'react';
import { FormControl, Grid, Alert, TextField } from '@mui/material';
import { urlEndpoint } from '../../services/url';
import { createAdmin, updateAdmin } from '../../services/adminService';
import { fetchEmployee, fetchEmployeeByUserId } from '../../services/employeeService';
import FormTextField from '../elements/FormTextField';
import FormSelect from '../elements/FormSelect';
import FileUploadField from '../elements/FormUploadField';
import SwitchField from '../elements/SwitchField';
import SubmitButton from '../elements/SubmitButton';

const AdminForm = ({ mode = 'create', adminData = {} }) => {
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
    const [errorMessages, setErrorMessages] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [managerOptions, setManagerOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    // Get employee for manager options
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

    // Load fetched employee list
    const loadManagerOptions = async () => {
        const options = await fetchEmployeeOptions();
        setManagerOptions(options);
    };

    // Load employee for initial form
    const loadEmployee = async () => {
        // Only for edit form
        if (mode === 'edit' && adminData) {
            const selectedEmployee = await fetchEmployeeByUserId(adminData.user_id);
            
            const avatarUrl = `${urlEndpoint}/${adminData.profile_picture_url}`;
            setFormData({
                user_id: adminData.user_id || '',
                full_name: adminData.full_name || '',
                phone_number: adminData.phone_number || '',
                username: adminData.username || '',
                email: adminData.email || '',
                profile_picture_url: avatarUrl || null,
                is_active: adminData.is_active || false,
                employee_id: selectedEmployee.employee_id || '',
                position: selectedEmployee.position || '',
                department: selectedEmployee.department || '',
                manager_id: selectedEmployee.manager_id || '',
                employment_date: selectedEmployee.employment_date || '',
            });
            setProfilePicture(null);
        }
    };

    // Formatting date
    const formatDate = (date) => {
        // Is date valid
        const parsedDate = new Date(date);
        if (isNaN(parsedDate)) {
            return '';
        }
        
        return parsedDate.toISOString().split('T')[0];
    }

    useEffect(() => {
        loadManagerOptions();
    }, [])

    useEffect(() => {
        loadEmployee();
        
    }, [adminData]);

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
        setErrorMessages({});
        setSuccessMessage('');
        setLoading(true);

        const serviceFunction = mode === 'create' ? createAdmin : updateAdmin;
        const { success, error } = await serviceFunction(formData, profilePicture);

        if (success) {
            setSuccessMessage(`Admin ${mode === 'create' ? 'created' : 'updated'} successfully!`);
            setLoading(false);
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
            setErrorMessages(error);
            setLoading(false);
        }
    };

    return (
        <FormControl component="form" onSubmit={handleSubmit}>
            {errorMessages.general && <Alert severity="error">{errorMessages.general}</Alert>}
            {successMessage && <Alert severity="success">{successMessage}</Alert>}

            <Grid container spacing={2}>
                <FormTextField label="Full Name" name="full_name" value={formData.full_name} onChange={handleChange} error={errorMessages.full_name} />
                <FormTextField label="Position" name="position" value={formData.position} onChange={handleChange} error={errorMessages.position} />
                <FormTextField label="Department" name="department" value={formData.department} onChange={handleChange} error={errorMessages.department} />
                <FormTextField label="Phone Number" name="phone_number" value={formData.phone_number} onChange={handleChange} error={errorMessages.phone_number} />
                <FormSelect
                    label="Supervisor"
                    name="manager"
                    value={formData.manager_id}
                    onChange={(event) => setFormData({ ...formData, manager_id: event.target.value })}
                    options={managerOptions}
                />
                <FormTextField label="Employement Date" name="employment_date" value={formatDate(formData.employment_date)} onChange={handleChange} error={errorMessages.employement_date} type="date" InputLabelProps={{ shrink: true }} />
                <FormTextField label="Username" name="username" value={formData.username} onChange={handleChange} error={errorMessages.username} />
                <FormTextField label="Email" name="email" value={formData.email} onChange={handleChange} error={errorMessages.email} type="email" />
                {mode === 'edit' && <SwitchField isActive={formData.is_active} handleSwitchChange={handleSwitchChange} />}
                <FileUploadField profilePicture={profilePicture} handleFileChange={handleFileChange} profilePictureUrl={formData.profile_picture_url} />
            </Grid>

            <SubmitButton loading={loading} text={mode === 'create' ? 'Create Admin' : 'Update Admin'} />
        </FormControl>
    );
};

export default AdminForm;
