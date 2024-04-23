import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, privilegeRequired }) => {
  const userPrivilege = localStorage.getItem("privilege");

  // Check if the required privilege matches the user's privilege
  if (userPrivilege !== privilegeRequired) {
    // Redirect them to the login page or a not authorized page
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
