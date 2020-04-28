import React from "react";
import SubscribeForm from "../Form/SubscribeForm";
import YouTube from "../YouTube";

function News() {
  return (
    <div>
      <div>
        <h2>Twitter</h2>
        <p>
          <a
            href="https://twitter.com/cryptoeconlab"
            target="_blank"
            rel="noopener"
          >
            Follow @cryptoeconlab on Twitter
          </a>
          &nbsp;to get the up-to-date news. Tweet us any comments, we are
          excited to see some unique usecase.
        </p>
      </div>
      <div>
        <h2>YouTube</h2>
        <p>
          Go to our YouTube page and watch some talks explaining OVM and
          framework in general. Also there are some demo videos.
        </p>
        <YouTube youtubeId="St1-YmucrTM" />
        <p>
          <a
            href="https://www.youtube.com/channel/UCp1w3jQNBDD2Pz4kool36Pw"
            target="_blank"
            rel="noopener"
          >
            -> Visit Gazelle's YouTube page.
          </a>
        </p>
      </div>
      <div>
        <h2>Blog</h2>
        <p>
          Gazelle core dev team has posted some articles explaining the
          technology in the framework.
          <br />
          <a
            href="https://medium.com/cryptoeconomics-lab"
            target="_blank"
            rel="noopener"
          >
            -> Go read blog posts.
          </a>
        </p>
      </div>
      <div>
        <h2>Newsletters</h2>
        <p>
          Subscribe to Gazelle's newsletters mailing list for getting the latest
          updates.
        </p>
        <SubscribeForm isFooter={false} />
      </div>
    </div>
  );
}

export default News;
