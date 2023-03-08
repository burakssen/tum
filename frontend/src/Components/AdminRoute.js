import React from "react";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
    const isAdmin = JSON.parse(sessionStorage.getItem("administration"));
    if (!isAdmin) {
        return <Navigate to="/home" replace />
    }
    return children;
}

export default AdminRoute;