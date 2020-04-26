import React from "react";
import styles from "./styles.module.scss";

export default ({ youtubeId }) => {
  return (
    <div className={styles.root}>
      <iframe
        className={styles.iframe}
        src={`https://www.youtube.com/embed/${youtubeId}`}
        frameBorder="0"
      />
    </div>
  );
};
