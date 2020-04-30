import React from "react"
import styles from "./styles.module.scss"
import Button from "../Button"
import RoundDivider from "../RoundDivider"

const features = [
  {
    title: "Secure",
    desc:
      "Remove the security issues when developing Layer 2 applications. Simply build your application with Gazelle and you'll have an application with the same level of security as Layer 1."
  },
  {
    title: "Fast",
    desc:
      "Gazelle is able to build applications with high throughput and instant finality using Layer 2 technology."
  },
  {
    title: "Low Cost",
    desc:
      "Compression of transactions can reduce the end user's gas costs when using public blockchains. It is also possible to reduce operational costs by utilizing public blockchains."
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
  )
}

export default Hero
