import React from "react"
import Layout from "@theme/Layout"

function Thanks(props) {
  return (
    <Layout title={props.title}>
      <div className="container margin-vert--xl">
        <div className="row">
          <div className="col col--6 col--offset-3">
            <h1 className="hero__title">{props.header}</h1>
            <p>{props.desc}</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Thanks
