import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";

const ProtectedRoute = ({ children }) => {
  const user = useSelector(selectCurrentUser);

  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};
export default ProtectedRoute;
