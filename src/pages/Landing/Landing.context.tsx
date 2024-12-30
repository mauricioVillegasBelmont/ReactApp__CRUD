import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

export interface Landing {
  id: string;
}
export interface LandingContextProps {
  LandingConfig: Landing | null;
  children: ReactElement;
}

export const LandingContext = createContext<Landing | null>(null);
export const LandingContextProvider = (props: LandingContextProps) => {
  const { LandingConfig, children } = props;

  const [Landing, setLanding] = useState<Landing | null>(null);
  useEffect(() => {
    if (LandingConfig !== null) {
      setLanding({
        id: LandingConfig.id,
      });
    }
  }, [LandingConfig]);

  return (
    <>
      <LandingContext.Provider value={Landing}>{children}</LandingContext.Provider>
    </>
  );
};

export default function useLandingContext() {
  const context = useContext<Landing | null>(
    LandingContext
  );
  if (!context) throw new Error("Landing context error!!");
  return context;
}
