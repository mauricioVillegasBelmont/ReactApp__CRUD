import React from "react";
import { useTemplateNameHooks } from "./TemplateName.hooks";
import styles from "./TemplateName.module.scss";


const TemplateName: React.FC = () => {
  return (
    <>
      <p className={`${styles.TemplateName}`}>page - TemplateName</p>
    </>
  );
};

export default TemplateName;