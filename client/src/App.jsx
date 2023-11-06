import Login from "./features/auth/Login";
import Home from "./pages/Home";
import Error404 from "./pages/Error404";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SharedLayout } from "./components/SharedLayout";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useCheckTokenValidityMutation } from "./features/auth/authApiSlice";
import { setCredentials } from "./features/auth/authSlice";
import Register from "./features/auth/Register";

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
        await checkTokenValidity();
      }
    };
    updateTokensState();
  }, [dispatch]);

  // After initial state is set, check for token validity
  // useCheckTokenValidityQuery();

  return (
    <BrowserRouter>
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
