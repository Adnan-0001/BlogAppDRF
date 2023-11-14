import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { SharedLayout } from "./components/SharedLayout";
import Login from "./features/auth/Login";
import Dashboard from "./pages/Dashboard";
import Error404 from "./pages/Error404";
import Home from "./pages/Home";

import { ToastContainer } from "react-toastify";
import ProtectedOwnersOnlyRoute from "./components/ProtectedOwnersOnlyRoute";
import Register from "./features/auth/Register";
import { useCheckTokenValidityMutation } from "./features/auth/authApiSlice";
import { setCredentials } from "./features/auth/authSlice";
import { PostCreateForm } from "./features/posts/PostCreateForm";
import PostDetail from "./features/posts/PostDetail";
import { PostEditForm } from "./features/posts/PostEditForm";
import PostList from "./features/posts/PostList";

function App() {
  const dispatch = useDispatch();

  const [checkTokenValidity] = useCheckTokenValidityMutation();

  useEffect(() => {
    const updateTokensState = async () => {
      const tokens = localStorage.getItem("authTokens")
        ? JSON.parse(localStorage.getItem("authTokens"))
        : null;

      if (tokens) {
        dispatch(setCredentials({ ...tokens }));
        // await checkTokenValidity();
      }
    };
    updateTokensState();
  }, [dispatch]);

  // After initial state is set, check for token validity
  // useCheckTokenValidityQuery();

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="posts/add"
            element={
              <ProtectedRoute>
                <PostCreateForm />
              </ProtectedRoute>
            }
          />

          <Route path="posts">
            <Route index element={<PostList />} />
            <Route path=":postId" element={<PostDetail />} />
            <Route
              path="edit/:postId"
              element={
                <ProtectedRoute>
                  <ProtectedOwnersOnlyRoute>
                    <PostEditForm />
                  </ProtectedOwnersOnlyRoute>
                </ProtectedRoute>
              }
            />
          </Route>

          {/* <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route> */}
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

{
  /* <Route
  path="dashboard"
  element={
    <ProtectedRoute userId={userId}>
      <Dashboard />
    </ProtectedRoute>
  }
/>
*/
}
