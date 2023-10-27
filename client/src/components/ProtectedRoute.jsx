import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "../features/auth/authSlice";

const ProtectedRoute = ({ children }) => {
  const userId = useSelector(selectCurrentUserId);

  if (!userId) {
    return <Navigate to="/" />;
  }
  return children;
};
export default ProtectedRoute;
