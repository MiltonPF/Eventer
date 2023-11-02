import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ isAuthenticated, element, redirectTo }) => {
  return isAuthenticated ? element : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
