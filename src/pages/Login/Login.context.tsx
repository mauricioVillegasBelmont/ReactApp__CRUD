import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

export interface Login {
  id: string;
}
export interface LoginContextProps {
  LoginConfig: Login | null;
  children: ReactElement;
}

export const LoginContext = createContext<Login | null>(null);
export const LoginContextProvider = (props: LoginContextProps) => {
  const { LoginConfig, children } = props;

  const [Login, setLogin] = useState<Login | null>(null);
  useEffect(() => {
    if (LoginConfig !== null) {
      setLogin({
        id: LoginConfig.id,
      });
    }
  }, [LoginConfig]);

  return (
    <>
      <LoginContext.Provider value={Login}>{children}</LoginContext.Provider>
    </>
  );
};

export default function useLoginContext() {
  const context = useContext<Login | null>(
    LoginContext
  );
  if (!context) throw new Error("Login context error!!");
  return context;
}
