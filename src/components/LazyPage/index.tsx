import React from "react";
import styles from "./LazyPage.module.scss";
import DisplayFull from "templates/display-full";
import { Spinner } from "flowbite-react";


const LazyPage: React.FC = () => {
  return (
    <>
      <DisplayFull
        classes={`${styles.lazyPage} flex justify-center items-center`}
      >
        <Spinner />
      </DisplayFull>
    </>
  );
};

export default LazyPage;