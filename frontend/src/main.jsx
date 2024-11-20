import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import Home from "./pages/Home.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Logout from "./pages/auth/Logout.jsx";
import PrivateRoutes from "./components/PrivateRoutes.jsx";
import ForgetPassword from "./pages/auth/ForgetPassword.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";
import DashBoard from "./pages/tasks/DashBoard.jsx";
import MyTasks from "./pages/tasks/MyTasks.jsx";
import CreateTask from "./pages/tasks/CreateTask.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Router
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true,
        }}
      >
        <Routes>
          <Route path="/" element={<App />}>
            <Route
              index
              element={
                  <Home />
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoutes>
                  <DashBoard />
                </PrivateRoutes>
              }
            />
            <Route
              path="/mytasks"
              element={
                <PrivateRoutes>
                  <MyTasks />
                </PrivateRoutes>
              }
            />
              <Route path="mytasks/create" element={<CreateTask />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/forgetPassword" element={<ForgetPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  </StrictMode>
);
