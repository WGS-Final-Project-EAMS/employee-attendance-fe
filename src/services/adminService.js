import axios from "axios";
import { token, urlEndpoint } from "./url";

// Get all active admin
export const fetchActiveAdmin = async () => {
    const response = await axios.get(`${urlEndpoint}/admins`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

// Create new admin
export const createAdmin = async (formData, profilePicture, token) => {
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

    try {
        const response = await axios.post(`${urlEndpoint}/admin`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
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
                error: error.response.data.error || { general: 'Failed to create admin' }
            };
        }

        // General error
        return { success: false, error: { general: 'Failed to create admin' } };
    }
};

// Edit admin
export const updateAdmin = async (adminData, profilePicture, token) => {
    try {
        const formData = new FormData();

        // Append all fields from adminData to the FormData object
        for (const key in adminData) {
            if (adminData.hasOwnProperty(key)) {
                formData.append(key, adminData[key]);
            }
        }
        
        // Append the profile picture file to FormData if it exists
        if (profilePicture) {
            formData.append('profile_picture_url', profilePicture);
        }

        // Make PUT request to update the admin
        const response = await axios.put(`${urlEndpoint}/admin/${adminData.admin_id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,  // Include token in the Authorization header
            },
        });

        if (response.status === 200) {
            return { success: true };
        } else {
            return { success: false, error: response.data };
        }
    } catch (error) {
        return { success: false, error: error.response?.data || 'An error occurred' };
    }
};