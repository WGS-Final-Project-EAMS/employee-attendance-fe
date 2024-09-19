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

// Fetch attendance recap
export const fetchAttendanceRecap = async ({ period, date, month, year }) => {
    try {
      const params = { period, date, month, year };
      const response = await axios.get(`${urlEndpoint}/attendance-recap`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      });
  
      return response.data.recaps;
    } catch (error) {
      console.error("Error fetching attendance recap:", error);
      throw new Error(error.response?.data?.error || "Failed to fetch attendance recap.");
    }
  };
  
  // Fetch attendance recap in CSV format
  export const fetchAttendanceRecapCSV = async ({ period, date, month, year }) => {
    try {
      const params = { period, date, month, year, format: 'csv' };
      const response = await axios.get(`${urlEndpoint}/attendance-recap`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
        responseType: 'blob', // For file download
      });
  
      return response.data;
    } catch (error) {
      console.error("Error fetching attendance recap CSV:", error);
      throw new Error(error.response?.data?.error || "Failed to fetch attendance recap CSV.");
    }
  };