import React from "react";
import styles from "./styles.module.scss";

function Showcase() {
  return (
    <div className={styles.root}>
      <div className={styles.showcaseRoot}>
        <h2 className={styles.headline}>Showcase</h2>
        <p className={styles.desc}>
          supports developers to create real cases of blockchain
        </p>
        <div className={styles.showcaseWrapper}>
          <div className={styles.showcases}>
            <div className={styles.showcase}>
              <div className={styles.showcase__imgWrap}>
                <img
                  src="https://picsum.photos/422/290"
                  className={styles.showcase__img}
                />
              </div>
              <div className={styles.showcase__body}>
                <h3 className={styles.showcase__title}>Your Plasma Wallet</h3>
                <p className={styles.showcase__desc}>
                  Plasma Chamber is a DApps development framework that
                  guarantees your.
                </p>
                <a href="/" className={styles.showcase__link}>
                  Play with Wallet
                </a>
              </div>
            </div>
            <div className={styles.showcase}>
              <div className={styles.showcase__imgWrap}>
                <img
                  src="https://picsum.photos/422/290"
                  className={styles.showcase__img}
                />
              </div>
              <div className={styles.showcase__body}>
                <h3 className={styles.showcase__title}>Playground</h3>
                <p className={styles.showcase__desc}>
                  Plasma Chamber is a DApps development framework that
                  guarantees your.
                </p>
                <a href="/" className={styles.showcase__link}>
                  Start Building
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.toolRoot}>
        <div className={styles.tool}>
          <div className={styles.toolInner}>
            <div className={styles.section}>
              <h2 className={styles.headline}>Tool</h2>
              <p className={styles.desc}>
                supports developers to create real cases of blockchain
              </p>
            </div>
            <div className={styles.showcase}>
              <div className={styles.showcase__imgWrap}>
                <img
                  src="https://picsum.photos/422/290"
                  className={styles.showcase__img}
                />
              </div>
              <div className={styles.showcase__body}>
                <h3 className={styles.showcase__title}>Your Plasma Wallet</h3>
                <p className={styles.showcase__desc}>
                  Plasma Chamber is a DApps development framework that
                  guarantees your.
                </p>
                <a href="/" className={styles.showcase__link}>
                  Play with Wallet
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Showcase;
