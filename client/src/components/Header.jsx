import { NavLink, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const onLogout = async () => {
    try {
      const result = await logout(curRefreshToken).unwrap();
      dispatch(clearCredentials());

      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const content = (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "link active navbar-brand" : "link navbar-brand"
          }
        >
          DRF Blogs
        </NavLink>

        {currUserId && (
          <>
            <span className="navbar-text">Welcome, {currUserId}</span>

            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "link active navbar-text ml-3"
                  : "link navbar-text ml-3"
              }
            >
              Home
            </NavLink>
          </>
        )}
        <NavLink
          to="/posts"
          className={({ isActive }) =>
            isActive ? "link active navbar-text  ml-3" : "link navbar-text ml-3"
          }
        >
          All Posts
        </NavLink>

        {currUserId && (
          <>
            <NavLink
              to="/posts/add"
              className={({ isActive }) =>
                isActive
                  ? "link active navbar-text ml-2"
                  : "link navbar-text ml-2"
              }
            >
              Add Post
            </NavLink>
          </>
        )}

        <button
          className="navbar-toggler ml-auto"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {currUserId && (
              <li className="nav-item">
                <button
                  className="btn btn-outline-primary my-2 my-lg-0 ml-2"
                  onClick={onLogout}
                >
                  Logout
                </button>
              </li>
            )}

            {!currUserId && (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "link active btn btn-outline-primary my-2 my-lg-0"
                        : "link btn btn-outline-primary my-2 my-lg-0"
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive
                        ? "link active btn btn-outline-primary my-2 my-lg-0 ml-2"
                        : "link btn btn-outline-primary my-2 my-lg-0 ml-2"
                    }
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );

  return content;
};
