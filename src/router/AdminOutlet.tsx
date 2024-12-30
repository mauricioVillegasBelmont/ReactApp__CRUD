import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "features/auth/hooks/useAuth";

export default function AdminOutlet() {
  const auth = useAuth();
  const location = useLocation();

  console.log(auth.user && auth.isAdmin )

  return auth.user && auth.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/admin" state={{ from: location }} />
  );
}
