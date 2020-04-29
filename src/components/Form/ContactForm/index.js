import React from "react"
import classnames from "classnames"
import styles from "./styles.module.scss"
import Button from "../../Button"

function ContactForm() {
  return (
    <form
      className={styles.root}
      action="/contact/thanks"
      name="contact"
      method="POST"
      data-netlify="true"
    >
      <input type="hidden" name="form-name" value="contact" />
      <input
        type="text"
        name="name"
        className={classnames(styles.input, "form-control")}
        placeholder="John Doe"
        required
      />
      <input
        type="text"
        name="email"
        className={classnames(styles.input, "form-control")}
        placeholder="cel@example.com"
        required
      />
      <textarea
        name="description"
        className={classnames(styles.input, styles.textarea, "form-control")}
        placeholder="Message here"
        required
      />
      <Button type="submit" full className={styles.button}>
        Send
      </Button>
    </form>
  )
}

export default ContactForm
