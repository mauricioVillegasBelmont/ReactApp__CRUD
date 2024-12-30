import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

export interface NotFound {
  id: string;
}
export interface NotFoundContextProps {
  NotFoundConfig: NotFound | null;
  children: ReactElement;
}

export const NotFoundContext = createContext<NotFound | null>(null);
export const NotFoundContextProvider = (props: NotFoundContextProps) => {
  const { NotFoundConfig, children } = props;

  const [NotFound, setNotFound] = useState<NotFound | null>(null);
  useEffect(() => {
    if (NotFoundConfig !== null) {
      setNotFound({
        id: NotFoundConfig.id,
      });
    }
  }, [NotFoundConfig]);

  return (
    <>
      <NotFoundContext.Provider value={NotFound}>{children}</NotFoundContext.Provider>
    </>
  );
};

export default function useNotFoundContext() {
  const context = useContext<NotFound | null>(
    NotFoundContext
  );
  if (!context) throw new Error("NotFound context error!!");
  return context;
}
