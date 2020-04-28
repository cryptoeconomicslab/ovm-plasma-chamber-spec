import React from "react"
import styles from "./styles.module.scss"
import classnames from "classnames"

function RoundDivider({ top }) {
  return (
    <>
      <img
        src="/img/round_divider.png"
        className={classnames(styles.img, {
          [styles.top]: top
        })}
      />
      <img
        src="/img/round_divider_sp.png"
        className={classnames(styles.imgSp, {
          [styles.top]: top
        })}
      />
    </>
  )
}

export default RoundDivider
