import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "features/auth/hooks/useAuth";
import NavBar from "components/NavBar/NavBar";

export default function PrivateOutlet() {
  const auth = useAuth();
  const location = useLocation();

  return auth.user ? (
    <>
      <NavBar isAuth={true} isAdmin={auth.isAdmin} user={auth.user} />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
}
