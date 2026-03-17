import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";


import ProtectedRoute from "./ProtectedRoutes";
import DashboardPage from "../pages/Dashboard";
import ClientKanbanPage from "../pages/ClientKanbanPage";

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

      </Routes>

    </BrowserRouter>

  );
}

export default AppRoutes;