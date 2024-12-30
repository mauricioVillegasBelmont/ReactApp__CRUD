import React, { FC } from "react";
import styles from "./TemplateName.module.scss";

interface TemplateNameProps {}

const TemplateName: FC<TemplateNameProps> = (props:TemplateNameProps) =>{
  const {} = props;
  return(
    <>
    <div className={styles.TemplateName}>TemplateName Component</div>
    </>
  );
}

export default TemplateName;
