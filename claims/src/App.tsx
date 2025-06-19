import {Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import DashboardPage from './pages/Dashboard/DashboardPage';
import ReportsPage from './pages/Reports/ReportsPAge';
import ReconciledPage from './pages/Reconciled/ReconciledPage';
import UnReconciledPage from './pages/Unreconciled/UnreconciledPAge';
import WorkQueuePage from './pages/workQueue';
const App = () => (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="reconciled" element={<ReconciledPage />} />
        <Route path="unreconciled" element={<UnReconciledPage />} />
        <Route path="workQueue" element={<WorkQueuePage />} />
      </Route>
    </Routes>

);

export default App;

