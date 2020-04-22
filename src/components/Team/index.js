import React from "react";
import Button from "../Button";
import Card from "../Card";
import styles from "./styles.module.scss";

function Team() {
  return (
    <div className={styles.root}>
      <p>
        Gazelle development is led by a small dedicated team working full time
        at Cryptoeconomics Lab. It also receives contributions from people all
        over the world.
      </p>

      <hr />

      <div className="row">
        <div className="col col--4">
          <Card name="Syuhei Hiya" img="/img/team/syuhei.png">
            Father of 2 lovely boys. Specializes in Programming Language Design.
            Experienced startup CEO twice and he says CEL is the best team ever.
          </Card>
        </div>
        <div className="col col--4">
          <Card name="Takamichi Tsutsumi" img="/img/team/takamichi.png">
            Used to be a JavaScript guy at a bunch of startups, while secretly
            loving low stuff development. Loves watching NBA games, Marvel films
            and weird YouTube channels.
          </Card>
        </div>
        <div className="col col--4">
          <Card name="Yuriko Nishijima" img="/img/team/yuriko.png">
            Jumped into a Ethereum Space in early 2018. Now developing coolest
            L2 apps at CEL. World traveler since high school, professional
            foodie since a baby.
          </Card>
        </div>
        <div className="col col--4">
          <Card name="You" img="/img/team/profile.svg">
            ...and you might be a next one!
          </Card>
        </div>
      </div>
      <div className="row">
        <div className={styles.card}>
          <p className={styles.header}>Yes, we are hiring!</p>
          <p>
            Cryptoeconomics Lab's R&D team is looking forward to meet someone
            who are passionate about blockchain production.
          </p>
          {/* TODO: change color */}
          <a href="https://www.cryptoeconomicslab.com" target="_blank">
            <Button>Apply</Button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Team;
