import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) {
        // not logged in → redirect
        navigate("/auth/login");
      }
      setLoading(false);
    },
    [isAuthenticated]
  );

  // logged in → show child routes
  return <>{!loading && children}</>;
}
