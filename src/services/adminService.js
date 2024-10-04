import axios from "axios";
import { token, urlEndpoint } from "./url";

// Get all active admin
export const fetchActiveAdmin = async () => {
    const response = await axios.get(`${urlEndpoint}/admins/active`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    
    return response.data;
};

// Get all active admin
export const fetchNonActiveAdmin = async () => {
    const response = await axios.get(`${urlEndpoint}/admins/non-active`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

// Create new admin
export const createAdmin = async (formData, profilePicture) => {
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
export const updateAdmin = async (adminData, profilePicture) => {
    try {
        const formData = new FormData();

        adminData.employment_date = new Date(adminData.employment_date).toISOString();

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
        const response = await axios.put(`${urlEndpoint}/admin/${adminData.user_id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,  // Include token in the Authorization header
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
                error: error.response.data.error || { general: 'Failed to create admin' }
            };
        }

        // General error
        return { success: false, error: { general: 'Failed to create admin' } };
    }
};

export const getAdminByUserId = async () => {
    try {
        const response = await axios.get(`${urlEndpoint}/user-admin`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;

    } catch (error) {
        return { error: error.response?.data || 'An error occurred' };
    }
}

// Delete admin (hard delete)
export const deleteAdmin = async (adminId) => {
    try {
        const response = await axios.delete(`${urlEndpoint}/admin/${adminId}`, {
            headers: {
                Authorization: `Bearer ${token}`,  // Include token in the Authorization header
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
}