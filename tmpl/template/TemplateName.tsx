import React from "react";
import styles from "./TemplateName.module.scss";


interface TemplateNameProps {}
const TemplateName: React.FC<TemplateNameProps> = (props: TemplateNameProps) => {
  const {  } = props;
  return (
    <>
      <p className={`${styles.TemplateName}`}>page - TemplateName</p>
    </>
  );
};

export default TemplateName;