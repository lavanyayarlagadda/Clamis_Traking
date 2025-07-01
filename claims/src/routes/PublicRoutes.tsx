import React from "react";
import GuestGuard from "../auth/guards/GuestGuard";
import ResetPassword from "../pages/Auth/ResetPassword";
import ForgotPassword from "../pages/Auth/ForgotPassword";
const Login = React.lazy(() => import("../pages/Auth/LoginPage"));
// const Signup = React.lazy(() => import("../pages/Auth/SignupPage"));

export const publicRoutes = [
  {
    path: "/login",
    element: (
      <GuestGuard>
        <Login />
      </GuestGuard>
    ),
  },
   {
    path: "/resetPassword",
    element: (
      <GuestGuard>
        <ResetPassword />
      </GuestGuard>
    ),
  },
    {
    path: "/forgotPassword",
    element: (
      <GuestGuard>
        <ForgotPassword />
      </GuestGuard>
    ),
  },

  // Add more public routes here
];
