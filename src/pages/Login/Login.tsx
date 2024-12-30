import React from "react";
// import { useLoginHooks } from "./Login.hooks";
import styles from "./Login.module.scss";
import LoginForm from "features/auth/components/LoginForm/LoginForm";

const Login: React.FC = () => {
  return (
    <>
      <div className={`${styles.login__page} flex h-screen`}>
        <div className={`${styles.login__wrapper} mx-auto my-auto`}>
          <h1 className={`${styles.login__title} mb-5`}>page - Login</h1>
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default Login;