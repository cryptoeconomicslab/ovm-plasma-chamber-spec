import React from "react"
import styles from "./styles.module.scss"

const roadmaps = [
  {
    title: "Developing Plasma Chamber in TypeScript",
    link: "https://github.com/cryptoeconomicslab/plasma-chamber",
    linkTxt: "See source code"
  },
  {
    title: "EDCON 2019",
    link: "https://www.youtube.com/watch?v=87TJbdKtyis",
    linkTxt: "Watch our talk"
  },
  {
    title: "Scaling Ethereum",
    link: "https://youtu.be/uXVE6lF1eDA?t=4645",
    linkTxt: "Watch our talk"
  },
  {
    title: "Developing OVM-based Plasma Chamber in Rust",
    link: "https://github.com/cryptoeconomicslab/plasma-rust-framework",
    linkTxt: "See source code"
  },
  {
    title: "ETHBoston - Ethereum Blockchain Hackathon",
    link: "/",
    linkTxt: ""
  },
  {
    title: "Devcon5",
    link: "https://www.youtube.com/watch?v=St1-YmucrTM",
    linkTxt: "Watch our talk"
  },
  {
    title: "Developing OVM-based Plasma in Typescript",
    link: "https://github.com/cryptoeconomicslab/wakkanay",
    linkTxt: "See source code"
  }
]

function RoadmapItem({ title, link, linkTxt }) {
  return (
    <li className={styles.roadmap__item}>
      <span className={styles.roadmap__txt}>{title}</span>
      <a
        href={link}
        target="_blank"
        rel="noopener"
        className={styles.roadmap__link}
      >
        {linkTxt}
      </a>
    </li>
  )
}

function Roadmap() {
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <h2 className={styles.headline}>Roadmap</h2>
        <p className={styles.desc}>keep track of our work</p>
        <div className={styles.roadmap}>
          <div className={styles.roadmap__line} />
          <div
            className={`${styles.roadmap__year} ${styles.roadmap__yearFirst}`}
          >
            <span className={styles.roadmap__yearTxt}>2020</span>
          </div>
          <ul className={styles.roadmap__list}>
            {roadmaps.map((roadmap, i) => (
              <RoadmapItem {...roadmap} key={i} />
            ))}
          </ul>
          <div
            className={`${styles.roadmap__year} ${styles.roadmap__yearLast}`}
          >
            <span className={styles.roadmap__yearTxt}>2021</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Roadmap
