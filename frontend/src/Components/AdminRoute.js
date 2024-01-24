import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "wc-toast";

function AdminRoute({ children }) {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user.roles.includes("staff")) {
        toast.error("Sie sind nicht autorisiert auf diese Seite zuzugreifen!");
        return <Navigate to="/home" replace />
    }
    return children;
}

export default AdminRoute;