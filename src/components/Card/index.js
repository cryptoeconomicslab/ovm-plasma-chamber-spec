import React from "react"
import styles from "./styles.module.scss"

function Card(props) {
  return (
    <div className={`${styles.root} ${props.className}`}>
      <div className={styles.imgWrap}>
        <img
          src={props.img}
          alt={props.name}
          className={styles.img}
          decoding="async"
        />
      </div>
      <p className={styles.name}>{props.name}</p>
      <p className={styles.desc}>{props.desc}</p>
    </div>
  )
}

export default Card
