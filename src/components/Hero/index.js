import React from "react";
import styles from "./styles.module.scss";
import Button from "../Button";
import RoundDivider from "../RoundDivider";

const features = [
  {
    title: "Secure",
    desc: `The app is great in design and incredibly simple to use. Well
    categorized navigation and easy to surf content. The user
    experience of the app is excellent.`,
  },
  {
    title: "Fast",
    desc: `Watch thousands of HD Movies and TV shows for free. Regularly
    updates with fresh content. Get movie details like posters,
    trailer, date of release, and rating.`,
  },
  {
    title: "Low Cost",
    desc: `Save all your favorite stuff and watch them later. Access this
    section anytime you want, whether you want watch it again or
    later.`,
  },
];

function Feature({ title, desc }) {
  return (
    <div className={styles.feature}>
      <h2 className={styles.feature__title}>{title}</h2>
      <p className={styles.feature__desc}>{desc}</p>
    </div>
  );
}

function Hero() {
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h1 className={styles.headline}>Secure Dapps without any hassle</h1>
          <p className={styles.desc}>
            Gazelle is a DApps development framework that guarantees to make the
            app secure, scalable, and usable with the Layer 2 technology.
          </p>
          <div className={styles.btnWrap}>
            <Button to="docs/getting-started/Try_Gazelle_In_Local">
              Get Started
            </Button>
          </div>
        </div>
        <hr className={styles.hr} />
        <div className={styles.features}>
          {features.map((feature, i) => (
            <Feature {...feature} key={i} />
          ))}
        </div>
        <RoundDivider />
      </div>
    </div>
  );
}

export default Hero;
