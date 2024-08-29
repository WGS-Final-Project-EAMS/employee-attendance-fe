import axios from 'axios';
import { urlEndpoint, saveToken } from './url'; // Import utility functions and constants for handling URLs and tokens
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode for decoding JWT tokens
import Cookies from 'js-cookie';

export const userLogin = async (email, password, onAdminLogin, onSuperAdminLogin, onEmployeeLogin) => {
    try {        
        // Make a POST request to the login endpoint with email and password
        const response = await axios.post(`${urlEndpoint}/login`, {
            email, password
        });

        if (response && response.status === 200) { // Login success
            // Extract token from the response
            const { token } = response.data;

            // Decode the JWT token to get the payload
            const payload = jwtDecode(token);

            saveToken(token);

            // Determine the type of user based on the access level and call corresponding callback
            switch (payload.role) {
                case 'admin':
                    onAdminLogin();
                    break;
                case 'employee':
                    onEmployeeLogin();
                    break;
                case 'super_admin':
                    onSuperAdminLogin();
                    break;
                default:
                    break;
            }
        } else { // Login failed
            return response.data.error;
        }

    } catch (error) {
        // Return error response data or a generic message if none provided
        return error.response?.data?.error || { general: "Login failed. Please try again." };       
    }
}

export const userLogout = async (onLogout) => {
    try {
        // Make a POST request to the login endpoint with email and password
        const response = await axios.post(`${urlEndpoint}/logout`);
        
        if (response.status === 200) {
            Cookies.remove('token');

            onLogout();
        }

    } catch (error) {
        console.error("Logout failed:", error);
    }
}