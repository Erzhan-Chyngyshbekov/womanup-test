import * as React from "react";
import Logo from "../../assets/icons/Logo.svg";

import styles from "./AppTitle.module.less";

export const AppTitle: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <img className={styles.logo} src={Logo} alt="Logo" />
      <span className={styles.to}>to</span>
      <span className={styles.do}>do</span>
    </div>
  );
};
