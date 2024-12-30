import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

export interface UserList {
  id: string;
}
export interface UserListContextProps {
  UserListConfig: UserList | null;
  children: ReactElement;
}

export const UserListContext = createContext<UserList | null>(null);
export const UserListContextProvider = (props: UserListContextProps) => {
  const { UserListConfig, children } = props;

  const [UserList, setUserList] = useState<UserList | null>(null);
  useEffect(() => {
    if (UserListConfig !== null) {
      setUserList({
        id: UserListConfig.id,
      });
    }
  }, [UserListConfig]);

  return (
    <>
      <UserListContext.Provider value={UserList}>{children}</UserListContext.Provider>
    </>
  );
};

export default function useUserListContext() {
  const context = useContext<UserList | null>(
    UserListContext
  );
  if (!context) throw new Error("UserList context error!!");
  return context;
}
