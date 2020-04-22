import React from "react";
import styles from "./styles.module.scss";
import Button from "../Button";

function Hero() {
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div class={styles.copy}>
          <h1 className={styles.headline}>Secure Dapps without any hassle</h1>
          <p className={styles.desc}>
            Gazelle is a DApps development framework that guarantees to make the
            app secure, scalable, and usable with the Layer 2 technology.
          </p>
          <div className={styles.btnWrap}>
            <a href="docs/getting-started/Try_Gazelle_In_Local">
              <Button>Get Started</Button>
            </a>
          </div>
        </div>
        <hr className={styles.hr} />
        <div className={styles.features}>
          <div className={styles.feature}>
            <h2 className={styles.feature__title}>Secure</h2>
            <p className={styles.feature__desc}>
              The app is great in design and incredibly simple to use. Well
              categorized navigation and easy to surf content. The user
              experience of the app is excellent.
            </p>
          </div>
          <div className={styles.feature}>
            <h2 className={styles.feature__title}>Fast</h2>
            <p className={styles.feature__desc}>
              Watch thousands of HD Movies and TV shows for free. Regularly
              updates with fresh content. Get movie details like posters,
              trailer, date of release, and rating.
            </p>
          </div>
          <div className={styles.feature}>
            <h2 className={styles.feature__title}>Low Cost</h2>
            <p className={styles.feature__desc}>
              Save all your favorite stuff and watch them later. Access this
              section anytime you want, whether you want watch it again or
              later.
            </p>
          </div>
        </div>
        <img src="/img/hero_divider.png" className={styles.img} />
        <img src="/img/hero_divider_sp.png" className={styles.imgSp} />
      </div>
    </div>
  );
}

export default Hero;
