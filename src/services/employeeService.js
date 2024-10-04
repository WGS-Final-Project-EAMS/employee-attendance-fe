import axios from "axios";
import { token, urlEndpoint } from "./url";

// Get all active employee
export const fetchEmployee = async (page, limit) => {
    const response = await axios.get(`${urlEndpoint}/employees?page=${page + 1}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    
    return response.data;
};

// Get inactive employees
export const fetchInactiveEmployees = async (page, limit) => {
    const response = await axios.get(`${urlEndpoint}/employees/inactive?page=${page + 1}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${token}`, // Include token in the Authorization header
        }
    });
    return response.data;
};

// Get employee by user id
export const fetchEmployeeByUserId = async (user_id) => {
    const response = await axios.get(`${urlEndpoint}/employees-user/${user_id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

// Get employee by user login
export const fetchEmployeeByUserLogin = async () => {
    const response = await axios.get(`${urlEndpoint}/employees-user`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

// Create new employee
export const createEmployee = async (formData, profilePicture) => {
    const data = new FormData();
    data.append('username', formData.username);
    data.append('email', formData.email);
    data.append('full_name', formData.full_name);
    data.append('phone_number', formData.phone_number);
    data.append('position', formData.position);
    data.append('department', formData.department);
    data.append('manager_id', formData.manager_id);
    data.append('employment_date', formData.employment_date);
    
    if (profilePicture) {
        data.append('profile_picture_url', profilePicture);
    }

    try {
        const response = await axios.post(`${urlEndpoint}/employees`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 201) {
            return { success: true };
        }
    } catch (error) {
        // Specific error
        if (error.response && error.response.data) {
            return { 
                success: false,
                error: error.response.data.error || { general: 'Failed to create employee' }
            };
        }

        // General error
        return { success: false, error: { general: 'Failed to create employee' } };
    }
};

// Create new employee (secret)
export const createEmployeeSecret = async (formData, profilePicture) => {
    const data = new FormData();
    data.append('username', formData.username);
    data.append('email', formData.email);
    data.append('full_name', formData.full_name);
    data.append('phone_number', formData.phone_number);
    data.append('position', formData.position);
    data.append('department', formData.department);
    data.append('manager_id', formData.manager_id);
    data.append('employment_date', formData.employment_date);
    
    if (profilePicture) {
        data.append('profile_picture_url', profilePicture);
    }

    try {
        const response = await axios.post(`${urlEndpoint}/employees-hidden`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 201) {
            return { success: true };
        }
    } catch (error) {
        // Specific error
        if (error.response && error.response.data) {
            return { 
                success: false,
                error: error.response.data.error || { general: 'Failed to create employee' }
            };
        }

        // General error
        return { success: false, error: { general: 'Failed to create employee' } };
    }
};

// Edit employee
export const updateEmployee = async (employeeData, profilePicture) => {
    try {
        const formData = new FormData();

        employeeData.employment_date = new Date(employeeData.employment_date).toISOString();

        // Append all fields from employeeData to the FormData object
        for (const key in employeeData) {
            if (employeeData.hasOwnProperty(key)) {
                formData.append(key, employeeData[key]);
            }
        }

        // Append the profile picture file to FormData if it exists
        if (profilePicture) {
            formData.append('profile_picture_url', profilePicture);
        }

        // Make PUT request to update the employee
        const response = await axios.put(`${urlEndpoint}/employees/${employeeData.employee_id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`, // Include token in the Authorization header
            },
        });

        if (response.status === 200) {
            return { success: true };
        }
    } catch (error) {
        // Specific error
        if (error.response && error.response.data) {
            return { 
                success: false,
                error: error.response.data.error || { general: 'Failed to create employee' }
            };
        }

        // General error
        return { success: false, error: { general: 'Failed to create employee' } };
    }
};

// Delete employee (hard delete)
export const deleteEmployee = async (employeeId) => {
    try {
        const response = await axios.delete(`${urlEndpoint}/employees/${employeeId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Include token in the Authorization header
            }
        });

        if (response.status === 204) {
            return { success: true };
        } else {
            return { success: false, error: response.data };
        }
    } catch (error) {
        return { success: false, error: error.response?.data || 'An error occurred' };
    }
};