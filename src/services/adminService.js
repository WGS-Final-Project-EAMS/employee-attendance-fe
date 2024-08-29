import axios from "axios";
import { token, urlEndpoint } from "./url";

// Get all active admin
export const fetchActiveAdmin = async () => {
    const response = await axios.get(`${urlEndpoint}/admins`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};