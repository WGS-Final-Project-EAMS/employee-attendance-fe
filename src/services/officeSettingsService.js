import axios from "axios";
import { token, urlEndpoint } from "./url";

export const fetchOfficeSettings = async () => {
    const response = await axios.get(`${urlEndpoint}/office-settings`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const createOfficeSettings = async (data) => {
    const response = await axios.post(`${urlEndpoint}/office-settings`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const updateOfficeSettings = async (data) => {
    const response = await axios.put(`${urlEndpoint}/office-settings`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};