import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const Authmiddleware = ({ children }) => {
  const guestOnlyRoutes = ["/login", "/register", "/otp", "/login-with-mobile"];

  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem("authToken");

  if (!isAuthenticated && !guestOnlyRoutes.includes(location.pathname)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isAuthenticated && guestOnlyRoutes.includes(location.pathname)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default Authmiddleware;
