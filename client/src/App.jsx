import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import './App.css'
import Login from "./features/auth/Login";
import Home from "./pages/Home";
import Error404 from "./pages/Error404";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SharedLayout } from "./components/SharedLayout";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setCredentials } from "./features/auth/authSlice";
import { selectCurrentUserId } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const userId = useSelector(selectCurrentUserId);

  useEffect(() => {
    const tokens = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;
    console.log("eff", tokens);
    if (tokens) {
      dispatch(setCredentials({ ...tokens }));
    }
  }, []);
  console.log("fdsx", userId);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="Login" element={<Login />} />

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
