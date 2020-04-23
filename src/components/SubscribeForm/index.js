import React from "react";
import styles from "./styles.module.scss";
import Button from "../Button";

function SubscribeForm(props) {
  return (
    <form
      class={styles.root}
      name="subscribe"
      method="POST"
      data-netlify="true"
      {...props}
    >
      <input type="text" name="email" placeholder="cel@example.com" />
      <Button type="submit">Subscribe</Button>
    </form>
  );
}

export default SubscribeForm;
