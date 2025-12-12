import { useAuth } from "@/contexts/AuthContext";
import { useEffect, type ReactNode } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) {
        // not logged in → redirect
        navigate("/auth/login");
      }
    },
    [isAuthenticated]
  );

  // logged in → show child routes
  return children;
}
