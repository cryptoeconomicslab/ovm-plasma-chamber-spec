import React from "react";
import styles from "./styles.module.scss";
import Button from "../Button";

function SubscribeForm(props) {
  return (
    <form
      className={styles.root}
      action="/subscribe/thanks"
      name="subscribe"
      method="POST"
      data-netlify="true"
      {...props}
    >
      <input type="hidden" name="form-name" value="subscribe" />
      <input type="text" name="email" placeholder="cel@example.com" required />
      <Button type="submit">Subscribe</Button>
    </form>
  );
}

export default SubscribeForm;
