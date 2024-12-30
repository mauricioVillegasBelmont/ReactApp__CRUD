import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

export interface UserItem {
  id: string;
}
export interface UserItemContextProps {
  UserItemConfig: UserItem | null;
  children: ReactElement;
}

export const UserItemContext = createContext<UserItem | null>(null);
export const UserItemContextProvider = (props: UserItemContextProps) => {
  const { UserItemConfig, children } = props;

  const [UserItem, setUserItem] = useState<UserItem | null>(null);
  useEffect(() => {
    if (UserItemConfig !== null) {
      setUserItem({
        id: UserItemConfig.id,
      });
    }
  }, [UserItemConfig]);

  return (
    <>
      <UserItemContext.Provider value={UserItem}>{children}</UserItemContext.Provider>
    </>
  );
};

export default function useUserItemContext() {
  const context = useContext<UserItem | null>(
    UserItemContext
  );
  if (!context) throw new Error("UserItem context error!!");
  return context;
}
