import React from "react"
import Link from "@docusaurus/Link"
import classnames from "classnames"
import styles from "./styles.module.scss"

function Button(props) {
  const {
    withLogo,
    to,
    inline,
    full,
    className,
    children,
    ...restProps
  } = props
  return (
    <>
      {!to ? (
        <button
          /* Exceptionally use props-spreading in order to use like native <button> */
          {...restProps}
          className={classnames(className, styles.root, {
            [styles.inline]: inline,
            [styles.full]: full,
            [styles.withLogo]: withLogo
          })}
        >
          <span
            className={classnames(styles.txt, {
              [styles.withLogo]: withLogo
            })}
          >
            {children}
          </span>
        </button>
      ) : (
        <Link
          {...restProps}
          to={to}
          className={classnames(className, styles.root, {
            [styles.inline]: inline,
            [styles.full]: full,
            [styles.withLogo]: withLogo
          })}
        >
          <span
            className={classnames(styles.txt, {
              [styles.withLogo]: withLogo
            })}
          >
            {children}
          </span>
        </Link>
      )}
    </>
  )
}

export default Button
