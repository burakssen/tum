import React from "react";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
    if (sessionStorage.getItem("role") !== "administration") {
        return <Navigate to="/home" replace />
    }
    return children;
}

export default AdminRoute;