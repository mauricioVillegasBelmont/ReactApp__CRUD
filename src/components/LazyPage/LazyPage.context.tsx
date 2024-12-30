import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

export interface LazyPage {
  id: string;
}
export interface LazyPageContextProps {
  LazyPageConfig: LazyPage | null;
  children: ReactElement;
}

export const LazyPageContext = createContext<LazyPage | null>(null);
export const LazyPageContextProvider = (props: LazyPageContextProps) => {
  const { LazyPageConfig, children } = props;

  const [LazyPage, setLazyPage] = useState<LazyPage | null>(null);
  useEffect(() => {
    if (LazyPageConfig !== null) {
      setLazyPage({
        id: LazyPageConfig.id,
      });
    }
  }, [LazyPageConfig]);

  return (
    <>
      <LazyPageContext.Provider value={LazyPage}>{children}</LazyPageContext.Provider>
    </>
  );
};

export default function useLazyPageContext() {
  const context = useContext<LazyPage | null>(
    LazyPageContext
  );
  if (!context) throw new Error("LazyPage context error!!");
  return context;
}
