import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

import ProtectedRoute from "./ProtectedRoutes";
import DashboardPage from "../pages/Dashboard";
import ClientKanbanPage from "../pages/ClientKanbanPage";
import AdminRoute from "./AdminRoute";
import AdminDashboardPage from "../pages/AdminDashboard";
import ManageClientsPage from "../pages/ManageClientPage";
import AdminAllLogsPage from "../pages/AdminAllLogsPage";
import ClientLogsPage from "../pages/ClientLogsPage";
import SpecificDeploymentLogsPage from "../pages/SpecificDeploymentLogsPage";
import StatusClientsPage from "../pages/StatusClientsPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}

        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* PROTECTED ROUTES */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* CLIENT KANBAN BOARD */}

        <Route
          path="/client/:clientId"
          element={
            <ProtectedRoute>
              <ClientKanbanPage />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTES - LAZY LOADED */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboardPage />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/clients"
          element={
            <AdminRoute>
              <ManageClientsPage />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/status"
          element={
            <AdminRoute>
              <StatusClientsPage />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/logs"
          element={
            <AdminRoute>
              <AdminAllLogsPage />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/clients/:clientId/logs"
          element={
            <AdminRoute>
              <ClientLogsPage />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/deployments/:deploymentId/logs"
          element={
            <AdminRoute>
              <SpecificDeploymentLogsPage />
            </AdminRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
