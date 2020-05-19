import React from "react"
import Link from "@docusaurus/Link"
import styles from "./styles.module.scss"
import RoundDivider from "../RoundDivider"

const features = [
  {
    title: "Secure",
    desc:
      "You can build scalable applications without compromising security of blockchain."
  },
  {
    title: "Fast",
    desc:
      "Gazelle improves throughput to thousands of transactions per second and supports opt-in instant finality."
  },
  {
    title: "Low Cost",
    desc:
      "Gazelle greatly reduces transaction gas cost by compressing transactions."
  }
]

function Feature({ title, desc }) {
  return (
    <div className={styles.feature}>
      <h2 className={styles.feature__title}>{title}</h2>
      <p className={styles.feature__desc}>{desc}</p>
    </div>
  )
}

function Hero() {
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h1 className={styles.headline}>Secure DApps without any hassle</h1>
          <p className={styles.desc}>
            Gazelle is a DApps development framework that guarantees to make the
            app secure, scalable, and usable with the Layer 2 technology.
          </p>
          <div className={styles.btnWrap}>
            <Link
              to="docs/getting-started/Try_Gazelle_In_Local"
              className={styles.btn}
            >
              <span className={styles.btnTxt}>Get Started</span>
            </Link>
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
  )
}

export default Hero
