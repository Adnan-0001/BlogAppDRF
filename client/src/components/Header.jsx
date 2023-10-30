import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUserId,
  selectCurrentRefreshToken,
} from "../features/auth/authSlice";
import { useLogoutMutation } from "../features/auth/authApiSlice";
import { clearCredentials } from "../features/auth/authSlice";

export const Header = () => {
  const currUserId = useSelector(selectCurrentUserId);
  const curRefreshToken = useSelector(selectCurrentRefreshToken);

  const dispatch = useDispatch();

  const [logout] = useLogoutMutation();
  const onLogout = async () => {
    try {
      // const tokens = localStorage.getItem("authTokens")
      //   ? JSON.parse(localStorage.getItem("authTokens"))
      //   : null;
      // const refreshToken = tokens?.refresh;
      const result = await logout(curRefreshToken).unwrap();
      dispatch(clearCredentials());

      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="navbar">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "link active" : "link")}
      >
        Home
      </NavLink>

      <NavLink
        to="/dashboard"
        className={({ isActive }) => (isActive ? "link active" : "link")}
      >
        Dashboard
      </NavLink>
      {currUserId ? (
        <a onClick={onLogout}>Logout</a>
      ) : (
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Login
        </NavLink>
      )}
    </nav>
  );
};
