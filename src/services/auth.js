import axios from 'axios';
import { urlEndpoint, saveToken } from './url'; // Import utility functions and constants for handling URLs and tokens
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode for decoding JWT tokens

export const userLogin = async (email, password, onAdminLogin, onSuperAdminLogin, onEmployeeLogin) => {
    try {        
        // Make a POST request to the login endpoint with email and password
        const response = await axios.post(`${urlEndpoint}/login`, {
            email, password
        });

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

    } catch (error) {
        console.log(error);        
    }
}

export const userLogout = async (onLogout) => {
    try {
        // Make a POST request to the login endpoint with email and password
        const response = await axios.post(`${urlEndpoint}/logout`);
        
        if (response.status === 200) {
            onLogout();
        }

    } catch (error) {
        console.log(error);
        
    }
}