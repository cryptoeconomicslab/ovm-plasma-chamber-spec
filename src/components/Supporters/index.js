import React from "react";
import styles from "./styles.module.scss";

const supporters = [
  {
    img: "/img/supporters/ethereum_foundation.png",
    title: "Ethereum Foundation",
  },
  {
    img: "/img/supporters/tezos_foundation.png",
    title: "Tezos Foundation",
  },
  {
    img: "/img/supporters/web3_foundation.png",
    title: "Web3 Foundation",
  },
];

function Supporters() {
  return (
    <div className={styles.root}>
      <h2 className={styles.headline}>Supporters</h2>
      <div className={styles.supporters}>
        {supporters.map(({ img, title }, i) => (
          <div className={styles.supporter} key={i}>
            <img
              src={img}
              title={title}
              alt={title}
              className={styles.supporter__img}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Supporters;
