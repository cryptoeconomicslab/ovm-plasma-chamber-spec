import React from "react";
import styles from "./styles.module.scss";
import Button from "../../Button";

function SubscribeForm(props) {
  const { isFooter } = props;
  return (
    <form
      className={styles.root}
      action="/subscribe/thanks"
      name="subscribe"
      method="POST"
      data-netlify="true"
    >
      <input type="hidden" name="form-name" value="subscribe" />
      <input
        type="text"
        name="email"
        className={`form-control ${isFooter ? styles.footer : ""}`}
        placeholder="cel@example.com"
        required
      />
      <Button
        inline="true"
        type="submit"
        className={isFooter ? styles.footer : ""}
      >
        Subscribe
      </Button>
    </form>
  );
}

export default SubscribeForm;
