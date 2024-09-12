import axios from "axios";
import { token, urlEndpoint } from "./url";

// Get Employee Attendance Status
export const fetchAttendanceStatus = async () => {
    const response = await axios.get(`${urlEndpoint}/attendance-status`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return response.data.status;
}

// Handle Clock in
export const clockIn = async () => {
    const response = await axios.post(
        `${urlEndpoint}/clock-in`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data.attendance;
}

// Handle Clock out
export const clockOut = async () => {
    const response = await axios.post(
        `${urlEndpoint}/clock-out`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data.updatedAttendance;
}

// Get Employee Attendance History
export const fetchAttendanceHistory = async () => {
    const response = await axios.get(`${urlEndpoint}/attendance-history`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

// Get Today's Attendance
export const fetchTodayAttendance = async () => {
    const response = await axios.get(`${urlEndpoint}/today-attendance`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
    // try {
    // } catch (error) {
    //     console.error("Error fetching today's attendance:", error);
    //     // Optionally, you can throw the error again if you want to handle it elsewhere
    //     throw error;
    // }
};