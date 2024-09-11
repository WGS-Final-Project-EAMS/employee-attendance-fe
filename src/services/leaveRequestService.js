import axios from "axios";
import { token, urlEndpoint } from "./url";

// Get leave request by user
export const fetchLeaveRequest = async () => {
    const response = await axios.get(`${urlEndpoint}/leave-requests`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.leaveRequests;
};

// Get leave request by manager
export const fetchPermissionApproval = async () => {
    const response = await axios.get(`${urlEndpoint}/approval`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.approvalList;
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


// Update leave request status (approved, rejected)
export const updateLeaveRequest = async (data, status) => {

    try {
        const response = await axios.patch(`${urlEndpoint}/leave-requests/${data.leave_request_id}/status`, status, {
            headers: {
                Authorization: `Bearer ${token}`,
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
                error: error.response.data.error || { general: 'Failed to create leave request' }
            };
        }

        // General error
        return { success: false, error: { general: 'Failed to create leave request' } };
    }
};