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