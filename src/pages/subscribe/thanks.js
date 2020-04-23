import React from "react";
import Layout from "@theme/Layout";

function Thanks() {
  return (
    <Layout title="Subscribe success">
      <div className="container margin-vert--xl">
        <div className="row">
          <div className="col col--6 col--offset-3">
            <h1 className="hero__title">Thank you for your subscribe!</h1>
            <p>We will contact you if there are any updates.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Thanks;
