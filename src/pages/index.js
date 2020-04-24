import React from "react";
import classnames from "classnames";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Hero from "../components/Hero";
import Showcase from "../components/Showcase";
import Roadmap from "../components/Roadmap";
import Supporters from "../components/Supporters";
import styles from "./styles.module.scss";
import Button from "../components/Button";
import RoundDivider from "../components/RoundDivider";

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <Hero />
      <Showcase />
      <Roadmap />
      <Supporters />
      <div className={styles.cta}>
        <RoundDivider top />
        <Button to="docs/getting-started/Try_Gazelle_In_Local">
          Get Started
        </Button>
      </div>
    </Layout>
  );
}

export default Home;
