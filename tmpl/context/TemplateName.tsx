import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

export interface templatename {
  id: string;
}
export interface TemplateNameContextProps {
  templatenameConfig: templatename | null;
  children: ReactElement;
}

export const TemplateNameContext = createContext<templatename | null>(null);
export const TemplateNameContextProvider = (props: TemplateNameContextProps) => {
  const { templatenameConfig, children } = props;

  const [templatename, setTemplateName] = useState<templatename | null>(null);
  useEffect(() => {
    if (templatenameConfig !== null) {
      setTemplateName({
        id: templatenameConfig.id,
      });
    }
  }, [templatenameConfig]);

  return (
    <>
      <TemplateNameContext.Provider value={templatename}>{children}</TemplateNameContext.Provider>
    </>
  );
};

export default function useTemplateNameContext() {
  const templatenameContext = useContext(TemplateNameContext);
  if (!templatenameContext) throw new Error("TemplateName context error!!");
  return templatenameContext;
}
