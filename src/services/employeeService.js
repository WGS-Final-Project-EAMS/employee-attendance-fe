import axios from "axios";
import { token, urlEndpoint } from "./url";

// Get all active employee
export const fetchEmployee = async () => {
    const response = await axios.get(`${urlEndpoint}/employees`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};