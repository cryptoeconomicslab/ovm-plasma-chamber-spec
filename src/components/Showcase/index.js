import React from "react";
import styles from "./styles.module.scss";

const showcases = [
  {
    img: "img/showcases/wallet.png",
    title: "Your Plasma Wallet",
    desc: `Plasma Chamber is a DApps development framework that
    guarantees your.`,
    link: "https://wallet.gzle.io/",
    linkTxt: "Play with Wallet",
  },
  {
    img: "img/showcases/playground.png",
    title: "Playground",
    desc: `Plasma Chamber is a DApps development framework that
    guarantees your.`,
    link: "https://playground.gzle.io/",
    linkTxt: "Start Building",
  },
];

const tools = [
  {
    img: "https://picsum.photos/422/290",
    title: "Your Plasma Wallet",
    desc: `Plasma Chamber is a DApps development framework that
  guarantees your.`,
    link: "/",
    linkTxt: "Play with Wallet",
  },
];

function Showcase({ img, title, desc, link, linkTxt }) {
  return (
    <div className={styles.showcase}>
      <div className={styles.showcase__imgWrap}>
        <img src={img} className={styles.showcase__img} />
      </div>
      <div className={styles.showcase__body}>
        <h3 className={styles.showcase__title}>{title}</h3>
        <p className={styles.showcase__desc}>{desc}</p>
        <a
          href={link}
          target="_blank"
          rel="noopener"
          className={styles.showcase__link}
        >
          {linkTxt}
        </a>
      </div>
    </div>
  );
}

function Showcases() {
  return (
    <div className={styles.root}>
      <div className={styles.showcaseRoot}>
        <h2 className={styles.headline}>Showcase</h2>
        <p className={styles.desc}>
          supports developers to create real cases of blockchain
        </p>
        <div className={styles.showcaseWrapper}>
          <div className={styles.showcases}>
            {showcases.map((showcase, i) => (
              <Showcase {...showcase} key={i} />
            ))}
          </div>
        </div>
      </div>
      {/* <div className={styles.toolRoot}>
        <div className={styles.tool}>
          <div className={styles.toolInner}>
            <div className={styles.section}>
              <h2 className={styles.headline}>Tool</h2>
              <p className={styles.desc}>
                supports developers to create real cases of blockchain
              </p>
            </div>
            <Showcase {...tools[0]} />
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Showcases;
