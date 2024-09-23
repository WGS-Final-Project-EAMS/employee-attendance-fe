import axios from 'axios';
import { urlEndpoint, saveToken, token } from './url'; // Import utility functions and constants for handling URLs and tokens
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode for decoding JWT tokens
import Cookies from 'js-cookie';

export const userLogin = async (email, password, role, onAdminLogin, onSuperAdminLogin, onEmployeeLogin) => {
    try {
        let response;
        // Make a POST request to the login endpoint with email and password
        switch (role) {
            case "admin":
                response = await axios.post(`${urlEndpoint}/admin-login`, {
                    email, password
                });
            break;
            
            case "employee":
                response = await axios.post(`${urlEndpoint}/employee-login`, {
                    email, password
                });
            break;
            
            default:
                response = await axios.post(`${urlEndpoint}/login`, {
                    email, password
                });
            break;
        }

        if (response && response.status === 200) { // Login success
            // Extract token from the response
            const { token } = response.data;

            // Decode the JWT token to get the payload
            const payload = jwtDecode(token);

            saveToken(token);

            // Determine the type of user based on the access level and call corresponding callback
            switch (payload.roles) {
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

export const getCurrentUserId = () => {
  try {
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.user_id;
    }
  } catch (error) {
    console.error("Failed to get user ID from token:", error);
    return null;
  }
};

// Function untuk mendapatkan data user yang sedang login
export const getUserById = async () => {
    try {
        // Request ke endpoint BE untuk mendapatkan user berdasarkan ID
        const response = await axios.get(`${urlEndpoint}/user`, {
            headers: {
                Authorization: `Bearer ${token}` // Menyertakan token dalam header untuk otentikasi
            }
        });        

        // Jika request berhasil, kembalikan data user
        return response.data[0];
    } catch (error) {
        // Menangani error jika request gagal
        if (error.response && error.response.data) {
            return { success: false, error: error.response.data.error || 'Failed to get user data' };
        }
        return { success: false, error: 'Failed to get user data' };
    }
};

export const changePassword = async (newPassword, confirmPassword) => {
    try {
        const response = await axios.put(
            `${urlEndpoint}/user/change-password`,
            { newPassword, confirmPassword },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        
        return response;  // Mengembalikan data dari respons jika berhasil
    } catch (error) {
        // Mengembalikan pesan error jika terjadi kesalahan
        if (error.response && error.response.data) {
            return { success: false, error: error.response.data.error || 'Failed to change password' };
        }
        return { success: false, error: 'Failed to change password' };
    }
}