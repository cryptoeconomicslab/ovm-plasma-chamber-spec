import React from "react"
import Link from "@docusaurus/Link"
import styles from "./styles.module.scss"

const showcases = [
  {
    img: "img/showcases/wallet.png",
    title: "Gazelle Wallet",
    desc:
      "Gazelle Wallet is a sample wallet application running on Plasma built with Gazelle.",
    link: "https://github.com/cryptoeconomicslab/gazelle-wallet",
    linkTxt: "Play with Wallet"
  },
  {
    img: "img/showcases/playground.png",
    title: "Playground",
    desc:
      "Playground is online OVM-DSL compiler. It produces Solidity contracts to be used with Gazelle.",
    link: "https://ovm-compiler.gzle.io",
    linkTxt: "Start Building"
  }
]

// const tools = [
//   {
//     img: "https://picsum.photos/422/290",
//     title: "Your Plasma Wallet",
//     desc: `Plasma Chamber is a DApps development framework that
//   guarantees your.`,
//     link: "/",
//     linkTxt: "Play with Wallet"
//   }
// ]

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
  )
}

function Showcases() {
  return (
    <div className={styles.root}>
      <div className={styles.showcaseRoot}>
        <h2 className={styles.headline}>Example & Tool</h2>
        <p className={styles.desc}>
          See Gazelle's example and tool and{" "}
          <Link to="/communities/Collaboration">collaborate with us!</Link>
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
  )
}

export default Showcases
