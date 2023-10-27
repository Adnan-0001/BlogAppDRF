import { selectCurrentUserId } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const userId = useSelector(selectCurrentUserId);

  return <div>Hello dashboard user with id: {userId}</div>;
};

export default Dashboard;
