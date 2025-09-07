import React from "react";

import styles from "./Spinner.module.css";
const Spinner = () => {
  return (
    <div className={styles.main}>
      <span class={styles.loader}></span>
    </div>
  );
};

export default Spinner;
