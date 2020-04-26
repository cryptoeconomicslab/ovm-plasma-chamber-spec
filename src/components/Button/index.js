import React from "react";
import Link from "@docusaurus/Link";
import classnames from "classnames";
import styles from "./styles.module.scss";

function Button(props) {
  const { to, inline, children } = props;
  return (
    <>
      {!to ? (
        <button
          {...props}
          className={classnames(styles.root, {
            [styles.inline]: inline,
          })}
        >
          {children}
        </button>
      ) : (
        <Link
          {...props}
          className={classnames(styles.root, {
            [styles.inline]: inline,
          })}
        >
          {children}
        </Link>
      )}
    </>
  );
}

export default Button;
