import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

export interface Admin {
  id: string;
}
export interface AdminContextProps {
  AdminConfig: Admin | null;
  children: ReactElement;
}

export const AdminContext = createContext<Admin | null>(null);
export const AdminContextProvider = (props: AdminContextProps) => {
  const { AdminConfig, children } = props;

  const [Admin, setAdmin] = useState<Admin | null>(null);
  useEffect(() => {
    if (AdminConfig !== null) {
      setAdmin({
        id: AdminConfig.id,
      });
    }
  }, [AdminConfig]);

  return (
    <>
      <AdminContext.Provider value={Admin}>{children}</AdminContext.Provider>
    </>
  );
};

export default function useAdminContext() {
  const context = useContext<Admin | null>(
    AdminContext
  );
  if (!context) throw new Error("Admin context error!!");
  return context;
}
