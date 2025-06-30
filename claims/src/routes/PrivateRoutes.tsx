import React from "react";
import { Navigate } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import AuthGuard from "../auth/guards/AuthGurad";
// Lazy imports
const Dashboard = React.lazy(() => import("../pages/Dashboard/DashboardPage"));
const Reports = React.lazy(() => import("../pages/Reports/ReportsPAge"));
const Claims = React.lazy(() => import("../pages/claims/Claims"));
const Users = React.lazy(() => import("../pages/Users"));
const CreateUser = React.lazy(() => import("../pages/Users/createUser"));
const Reconciled = React.lazy(() => import("../pages/Reconciled/ReconciledPage"));
const Unreconciled = React.lazy(() => import("../pages/Unreconciled/UnreconciledPAge"));
const ComingSoon = React.lazy(() => import("../Components/reusable/comingSoon"));

export const privateRoutes = [
  {
    path: "/",
    element: (
      <AuthGuard>
        <AppLayout />
      </AuthGuard>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "reports", element: <Reports /> },
      { path: "reconciled", element: <Reconciled /> },
      { path: "unreconciled", element: <Unreconciled /> },
      { path: "allclaims", element: <Claims /> },
      { path: "users", element: <Users /> },
      { path: "createUser", element: <CreateUser /> },
      { path: "updateUser", element: <CreateUser /> },
      { path: "profile", element: <ComingSoon title="Profile" /> },
      { path: "notifications", element: <ComingSoon title="Notifications" /> },
    ],
  },
];
