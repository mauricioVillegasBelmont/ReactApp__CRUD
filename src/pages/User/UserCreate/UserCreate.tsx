import React from "react";
import { useUserCreateHooks } from "./UserCreate.hooks";
import styles from "./UserCreate.module.scss";


const UserCreate: React.FC = () => {
  return (
    <>
      <p className={`${styles.UserCreate}`}>page - UserCreate</p>
    </>
  );
};

export default UserCreate;