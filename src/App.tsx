import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import DashboardPage from "./dashboard/DashboardPage";
import FieldAnalysisPage from "./field-analysis/FieldAnalysisPage";
import HistoryPage from "./history/HistoryPage";
import SettingsPage from "./settings/SettingPage";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./auth/LoginPage";
import SignupPage from "./auth/SignupPage";
import LandingPage from "./landing/LandingPage";
import ProtectedRoute from "./auth/ProtectedRoute";
import MarketplacePage from "./marketplace/MarketPlace";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <MainLayout />, // Layout wraps the following children
    children: [{ path: "", element: <LandingPage /> }],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <MainLayout />, // Layout wraps the following children
      </ProtectedRoute>
    ),
    children: [
      { path: "home", element: <DashboardPage /> },
      { path: "analysis/:id", element: <FieldAnalysisPage /> },
      { path: "history", element: <HistoryPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "marketplace", element: <MarketplacePage /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
