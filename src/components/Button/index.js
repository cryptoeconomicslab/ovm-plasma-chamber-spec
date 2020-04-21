import React from "react";
import styles from "./styles.module.scss";

function Button(props) {
  return (
    <button className={styles.root} {...props}>
      {props.children}
    </button>
  );
}

export default Button;
