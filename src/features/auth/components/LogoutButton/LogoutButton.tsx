import { Button } from "flowbite-react";
import { FC,  } from "react";
import { useLogoutMutation } from "features/auth/authApi";

const LogoutButton: FC = () => {
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
      console.log("Logged out!");
    } catch (err) {
      console.error("Failed to logOut:", err);
    }
  };

  return (
    <Button onClick={handleLogout} disabled={isLoading}>
      LogOut
    </Button>
  );
};
export default LogoutButton;
