import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie"; // Asumsi Anda menggunakan cookie untuk menyimpan token

const ProtectedRoute = () => {
    const token = Cookies.get("token"); // Mendapatkan token dari cookie

    if (!token) {
        // Jika tidak ada token, arahkan ke halaman login
        return <Navigate to="/login" replace />;
    }

    // Jika ada token, render halaman yang diminta
    return <Outlet />;
};

export default ProtectedRoute;