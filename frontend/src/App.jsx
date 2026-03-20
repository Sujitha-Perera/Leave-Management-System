import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./context/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./context/RoleRoute";
import LoginPage from "./pages/LoginPage";
import SignUpChoicePage from "./pages/SignUpChoicePage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import CreateLeavePage from "./pages/CreateLeavePage";
import MyLeavesPage from "./pages/MyLeavesPage";
import AllLeavesPage from "./pages/AllLeavesPage";
import CreateEmployeePage from "./pages/CreateEmployeePage";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpChoicePage />} />
        <Route path="/signup/:role" element={<SignUpPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRole="MANAGER">
                <DashboardPage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/leave/create"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRole="EMPLOYEE">
                <CreateLeavePage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/leave/my"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRole="EMPLOYEE">
                <MyLeavesPage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/leave/all"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRole="MANAGER">
                <AllLeavesPage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees/create"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRole="MANAGER">
                <CreateEmployeePage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
