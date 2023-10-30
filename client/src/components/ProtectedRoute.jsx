import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "../features/auth/authSlice";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const userId = useSelector(selectCurrentUserId);

  console.log("in");
  const tokens = localStorage.getItem("authTokens");
  if (!tokens) {
    return <Navigate to="/login" replace={true} />;
  }
  console.log("bypassing if", children);
  // return <Outlet />;
  return children;
};
export default ProtectedRoute;
