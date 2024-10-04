import axios from "axios";
import { token, urlEndpoint } from "./url";

// Get all streaks
export const fetchAllStreaks = async () => {
    try {
        const response = await axios.get(`${urlEndpoint}/streaks`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.streaks;
    } catch (error) {
        console.error("Error fetching all streaks:", error);
        return { success: false, error: "Failed to fetch all streaks" };
    }
};

// Get streak by employee ID
export const fetchStreakByEmployeeId = async (employeeId) => {
    try {
        const response = await axios.get(`${urlEndpoint}/streaks/employee/${employeeId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching streak for employee ID: ${employeeId}`, error);
        return { success: false, error: "Failed to fetch streak by employee ID" };
    }
};

// Get streak by user ID
export const fetchStreakByUserId = async () => {
    try {
        const response = await axios.get(`${urlEndpoint}/streaks/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching streak for user ID:", error);
        return { success: false, error: "Failed to fetch streak by user ID" };
    }
};

// Reset streak for employee
export const resetStreak = async (employeeId, resetData) => {
    try {
        const response = await axios.post(`${urlEndpoint}/streaks/reset/${employeeId}`, resetData, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
            return { success: true };
        }
    } catch (error) {
        console.error(`Error resetting streak for employee ID: ${employeeId}`, error);
        return { success: false, error: "Failed to reset streak" };
    }
};