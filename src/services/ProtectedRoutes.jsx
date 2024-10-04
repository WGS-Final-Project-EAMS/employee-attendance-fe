import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode for decoding JWT tokens
import { token } from "./url";

const ProtectedRoute = ({ allowedRoles }) => {

    if (!token) {
        // Jika tidak ada token, arahkan ke halaman login
        return <Navigate to="/login" replace />;
    }
    
    // Decode the token to get the user's role
    const { roles } = jwtDecode(token);

    // Check if the user's role is allowed to access the requested route
    if (!allowedRoles.includes(roles)) {
        // Jika role tidak diizinkan, arahkan ke halaman yang sesuai, misalnya halaman "Unauthorized"
        return <Navigate to="/unauthorized" replace />;
    }

    // Jika ada token, render halaman yang diminta
    return <Outlet />;
};

export default ProtectedRoute;