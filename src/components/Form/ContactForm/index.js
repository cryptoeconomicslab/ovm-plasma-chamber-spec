import React from "react";
import styles from "./styles.module.scss";
import Button from "../../Button";

function ContactForm(props) {
  return (
    <form
      className={styles.root}
      action="/contact/thanks"
      name="contact"
      method="POST"
      data-netlify="true"
      {...props}
    >
      <input type="hidden" name="form-name" value="contact" />
      <input type="text" name="name" placeholder="John Doe" required />
      <input type="text" name="email" placeholder="cel@example.com" required />
      <textarea name="description" placeholder="Message here" required />
      <Button type="submit">Send</Button>
    </form>
  );
}

export default ContactForm;
