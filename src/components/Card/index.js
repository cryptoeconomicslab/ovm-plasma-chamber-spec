import React from "react";
import styles from "./styles.module.scss";

function Card(props) {
  return (
    <div className={styles.root}>
      <img src={props.img} alt={props.name} />
      <p className={styles.name}>{props.name}</p>
      <p className={styles.desc}>{props.children}</p>
    </div>
  );
}

export default Card;
