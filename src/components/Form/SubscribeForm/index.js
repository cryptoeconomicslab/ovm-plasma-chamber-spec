import React from "react";
import classnames from "classnames";
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
        className={classnames("form-control", styles.input, {
          [styles.footer]: isFooter,
        })}
        placeholder="cel@example.com"
        required
      />
      <Button
        inline="true"
        type="submit"
        className={classnames(styles.button, {
          [styles.footer]: isFooter,
        })}
      >
        Subscribe
      </Button>
    </form>
  );
}

export default SubscribeForm;
