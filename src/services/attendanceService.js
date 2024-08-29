import axios from "axios";
import { token, urlEndpoint } from "./url";

export const fetchAttendanceHistory = async () => {
    const response = await axios.get(`${urlEndpoint}/attendance-history`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};
