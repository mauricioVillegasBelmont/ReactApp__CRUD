import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser, } from "../authSlice";

export const useAuth = () => {
  const _user = useSelector(selectCurrentUser);
  return useMemo(() => {
    return {
      user: _user.user,
      isAdmin: _user.isAdmin,
    };
  }, [_user]);
};
