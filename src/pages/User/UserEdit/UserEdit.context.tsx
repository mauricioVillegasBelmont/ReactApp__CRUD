import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

export interface UserEdit {
  id: string;
}
export interface UserEditContextProps {
  UserEditConfig: UserEdit | null;
  children: ReactElement;
}

export const UserEditContext = createContext<UserEdit | null>(null);
export const UserEditContextProvider = (props: UserEditContextProps) => {
  const { UserEditConfig, children } = props;

  const [UserEdit, setUserEdit] = useState<UserEdit | null>(null);
  useEffect(() => {
    if (UserEditConfig !== null) {
      setUserEdit({
        id: UserEditConfig.id,
      });
    }
  }, [UserEditConfig]);

  return (
    <>
      <UserEditContext.Provider value={UserEdit}>{children}</UserEditContext.Provider>
    </>
  );
};

export default function useUserEditContext() {
  const context = useContext<UserEdit | null>(
    UserEditContext
  );
  if (!context) throw new Error("UserEdit context error!!");
  return context;
}
