import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import ReportsPage from "./pages/Reports/ReportsPAge";
import ReconciledPage from "./pages/Reconciled/ReconciledPage";
import UnReconciledPage from "./pages/Unreconciled/UnreconciledPAge";
import ClaimsPage from "./pages/claims/Claims";
import ComingSoon from "./Components/reusable/comingSoon";
// import WorkQueuePage from './pages/workQueue';
const App = () => (
  <Routes>
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Navigate to="/dashboard" replace />} />
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="reports" element={<ReportsPage />} />
      <Route path="reconciled" element={<ReconciledPage />} />
      <Route path="unreconciled" element={<UnReconciledPage />} />
      <Route path="allclaims" element={<ClaimsPage />} />
      {/* <Route path="workQueue" element={<WorkQueuePage />} /> */}
      <Route path="/profile" element={<ComingSoon title={"Profile"} />} />
      {/* <Route path="/login" element={<LoginPage />} /> */}
      <Route
        path="/notifications"
        element={<ComingSoon title={"Notifications"} />}
      />
    </Route>
  </Routes>
);

export default App;
