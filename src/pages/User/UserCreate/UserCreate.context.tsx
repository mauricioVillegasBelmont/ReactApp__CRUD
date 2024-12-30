import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

export interface UserCreate {
  id: string;
}
export interface UserCreateContextProps {
  UserCreateConfig: UserCreate | null;
  children: ReactElement;
}

export const UserCreateContext = createContext<UserCreate | null>(null);
export const UserCreateContextProvider = (props: UserCreateContextProps) => {
  const { UserCreateConfig, children } = props;

  const [UserCreate, setUserCreate] = useState<UserCreate | null>(null);
  useEffect(() => {
    if (UserCreateConfig !== null) {
      setUserCreate({
        id: UserCreateConfig.id,
      });
    }
  }, [UserCreateConfig]);

  return (
    <>
      <UserCreateContext.Provider value={UserCreate}>{children}</UserCreateContext.Provider>
    </>
  );
};

export default function useUserCreateContext() {
  const context = useContext<UserCreate | null>(
    UserCreateContext
  );
  if (!context) throw new Error("UserCreate context error!!");
  return context;
}
