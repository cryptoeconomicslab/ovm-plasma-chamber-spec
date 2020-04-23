import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.scss";

function Button(props) {
  return (
    <>
      {!props.to ? (
        <button {...props} className={styles.root}>
          {props.children}
        </button>
      ) : (
        <Link {...props} className={styles.root}>
          {props.children}
        </Link>
      )}
    </>
  );
}

export default Button;
