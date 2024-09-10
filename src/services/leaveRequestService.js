import axios from "axios";
import { token, urlEndpoint } from "./url";

// Get all leave request
export const fetchLeaveRequest = async () => {
    const response = await axios.get(`${urlEndpoint}/leave-requests`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.leaveRequests;
};

// Create new leave request
export const createLeaveRequest = async (formData) => {

    try {
        const response = await axios.post(`${urlEndpoint}/leave-requests`, formData, {
            headers: {
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
                error: error.response.data.error || { general: 'Failed to create leave request' }
            };
        }

        // General error
        return { success: false, error: { general: 'Failed to create leave request' } };
    }
};