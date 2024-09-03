import axios from "axios";
import { token, urlEndpoint } from "./url";

// Get Employee Attendance History
export const fetchErrorLog = async () => {
    const response = await axios.get(`${urlEndpoint}/error-logs`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};