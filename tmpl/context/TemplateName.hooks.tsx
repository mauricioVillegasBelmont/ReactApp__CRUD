import { useContext } from "react";
import TemplateName from './TemplateName';

export default function useTemplateName() {
  const templateName = useContext(TemplateName);
  if (!templateName) throw new Error("TemplateName error!!");
  return templateName;
}
