import React from "react";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user.roles.includes("student")) {
        return <Navigate to="/home" replace />
    }
    return children;
}

export default AdminRoute;