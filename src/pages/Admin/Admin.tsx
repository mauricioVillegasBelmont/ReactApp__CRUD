import React from "react";
// import { useAdminHooks } from "./Admin.hooks";
import styles from "./Admin.module.scss";


const Admin: React.FC = () => {
  return (
    <>
      <p className={`${styles.Admin}`}>page - Admin</p>
    </>
  );
};

export default Admin;