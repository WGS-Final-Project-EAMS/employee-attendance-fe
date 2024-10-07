import axios from "axios";
import { token, urlEndpoint } from "./url";

// Get all user notification
export const fetchNotification = async () => {
    const response = await axios.get(`${urlEndpoint}/notification`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    
    return response.data;
};

// Update notification is_read
export const updateNotification = async () => {
    const response = await axios.put(`${urlEndpoint}/notification`, null, {
        headers: { Authorization: `Bearer ${token}` }
    });
    
    return response.data;
};