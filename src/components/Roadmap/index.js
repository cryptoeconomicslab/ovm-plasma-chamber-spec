import React from "react";
import styles from "./styles.module.scss";

const roadmaps = [
  {
    title: "Developing Plasma Chamber in TypeScript",
    link: "/",
    linkTxt: "See source code",
  },
  {
    title: "EDCON 2019",
    link: "/",
    linkTxt: "Watch our talk",
  },
  {
    title: "SCALING ETHEREUM",
    link: "/",
    linkTxt: "Watch our talk",
  },
  {
    title: "Developing OVM-based Plasma Chamber in Rust",
    link: "/",
    linkTxt: "See source code",
  },
  {
    title: "ETHBOSTON",
    link: "/",
    linkTxt: "Watch our talk",
  },
  {
    title: "Devcon5",
    link: "/",
    linkTxt: "Watch our talk",
  },
  {
    title:
      "Developing OVM-based Plasma Chamber in Typescript, Mobile L2 Wallet, Browser dev portal",
    link: "/",
    linkTxt: "See source code",
  },
];

function RoadmapItem({ title, link, linkTxt }) {
  return (
    <li className={styles.roadmap__item}>
      <span className={styles.roadmap__txt}>{title}</span>
      <a href={link} className={styles.roadmap__link}>
        {linkTxt}
      </a>
    </li>
  );
}

function Roadmap(props) {
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
  );
}

export default Roadmap;
