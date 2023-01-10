import React, { PropsWithChildren } from "react";
import styles from "./styles.module.scss";

const Desk = ({ children }: PropsWithChildren) => (
  <div className={styles.desk}>
    {children}
  </div>
);

export default Desk;
