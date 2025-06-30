import React from "react";
import GuestGuard from "../auth/guards/GuestGuard";
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

  // Add more public routes here
];
