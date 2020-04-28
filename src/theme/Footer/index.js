import React from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.scss";
import SubscribeForm from "../../components/Form/SubscribeForm";

function Footer() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  const { themeConfig = {} } = siteConfig;
  const { footer } = themeConfig;

  const { copyright, links = [], socials = [] } = footer || {};

  if (!footer) {
    return null;
  }

  return (
    <footer className={styles.root}>
      <div className={styles.row}>
        {links.map(({ title, items }, i) => (
          <div key={i} className={styles.column}>
            <h3 className={styles.title}>{title}</h3>
            <ul className={styles.list}>
              {items.map(({ label, to, href }, j) => (
                <li className={styles.item} key={j}>
                  {to ? (
                    <Link to={to} className={styles.link}>
                      {label}
                    </Link>
                  ) : (
                    <a href={href} className={styles.link}>
                      {label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className={`${styles.column} ${styles.columnExpand}`}>
          <h3 className={styles.title}>Sign up for our updates</h3>
          <SubscribeForm isFooter={true} />
          <ul className={styles.socials}>
            {socials.map(({ link, name, icon }) => (
              <li className={styles.social} key={name}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener"
                  className={styles.social__link}
                >
                  <FontAwesomeIcon icon={icon} size="2x" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.logo}>
          <Link to="/">
            <img src="/img/logo-w.svg" className={styles.logo__img} />
          </Link>
        </div>
        <small className={styles.copyright}>{copyright}</small>
      </div>
    </footer>
  );
}

export default Footer;
