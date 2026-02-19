import { useEffect } from "react";
import { Outlet } from "react-router";
import { keycloakLogin } from "../../auth/keycloak";
import { useAppSelector } from "../../store/hooks";

interface ProtectedRouteProps {
  children?: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      void keycloakLogin();
    }
  }, [isAuthenticated, loading]);

  if (loading) {
    return <div className="p-6 text-sm text-gray-500">Checking authentication...</div>;
  }

  if (!isAuthenticated) {
    return <div className="p-6 text-sm text-gray-500">Redirecting to login...</div>;
  }

  return children ?? <Outlet />;
}
