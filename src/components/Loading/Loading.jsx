import React from "react";

// import "./loading.css";

import styles from './Loading.module.css';


//! utilizar este componente para el preloading o pensar en uno para el preloading;
export const Loading = () => {
  return (
    <div className={styles.loading1}>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
    </div>
  );
};
