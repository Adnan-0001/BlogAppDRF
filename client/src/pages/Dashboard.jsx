import { selectCurrentUser } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const name = useSelector(selectCurrentUser);

  return <div>Hello dashboard {name}</div>;
};

export default Dashboard;
