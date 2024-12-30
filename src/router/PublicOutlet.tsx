import NavBar from "components/NavBar/NavBar";
import { Outlet } from "react-router-dom";

export default function PublicOutlet() {

  return (
    <>
      <NavBar isAuth={false} isAdmin={false}  />
      <Outlet />
    </>
  );
}
