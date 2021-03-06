import React from "react"
import Layout from "@theme/Layout"
import Hero from "../components/Hero"
import Showcase from "../components/Showcase"
import Roadmap from "../components/Roadmap"
import Supporters from "../components/Supporters"
import styles from "./styles.module.scss"
import Button from "../components/Button"
import RoundDivider from "../components/RoundDivider"

function Home() {
  return (
    <Layout
      title="Plasma Framework"
      description="Gazelle is a scaling technology for blockchain based on Plasma and OGS. Current scope of it's functionality includes transfer of WrappedETH and ERC20 tokens."
    >
      <Hero />
      <section id="example-and-tool">
        <Showcase />
      </section>
      <section id="roadmap">
        <Roadmap />
      </section>
      <section id="supporters">
        <Supporters />
      </section>
      <div className={styles.cta}>
        <RoundDivider top />
        <Button withLogo to="docs/get-started/Try_Gazelle_In_Local">
          Get Started
        </Button>
      </div>
    </Layout>
  )
}

export default Home
