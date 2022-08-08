import React from "react";
import { Navigate } from "react-router-dom";
import useStore from "../globalStateManger/store";

const ProtectedRoute = ({ children }) => {
  const { success, advertisment } = useStore();
  if (success && !advertisment) {
    return <Navigate to="/verify" />;
  } else if (success && advertisment) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
