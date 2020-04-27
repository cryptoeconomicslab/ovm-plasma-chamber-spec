import React from "react";
import Card from "../Card";
import styles from "./styles.module.scss";

const cards = [
  {
    name: "Syuhei Hiya",
    img: "/img/team/syuhei.png",
    desc:
      "Father of 2 lovely boys. Specializes in Programming Language Design. Experienced startup CEO twice and he says CEL is the best team ever.",
  },
  {
    name: "Takamichi Tsutsumi",
    img: "/img/team/takamichi.png",
    desc:
      "Used to be a JavaScript guy at a bunch of startups, while secretly loving low stuff development. Loves watching NBA games, Marvel films and weird YouTube channels.",
  },
  {
    name: "Yuriko Nishijima",
    img: "/img/team/yuriko.png",
    desc:
      "Jumped into a Ethereum Space in early 2018. Now developing coolest L2 apps at CEL. World traveler since high school, professional foodie since a baby.",
  },
];

function Team() {
  return (
    <div className={styles.root}>
      <p>
        Gazelle development is led by a small dedicated team working full time
        at Cryptoeconomics Lab. It also receives contributions from people all
        over the world.
      </p>

      <div className={styles.row}>
        {cards.map((card) => (
          <Card className={styles.cell} {...card} />
        ))}
      </div>

      <p>
        Cryptoeconomics Lab's R&amp;D team is looking for someone to contribute
        to the Gazelle! If you're interested, click&nbsp;
        <a
          href="https://www.cryptoeconomicslab.com"
          target="_blank"
          rel="noopener"
        >
          here
        </a>
        !
      </p>
    </div>
  );
}

export default Team;
