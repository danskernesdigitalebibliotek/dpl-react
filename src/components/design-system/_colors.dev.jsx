import React from "react";
import "./_colors.dev.scss";

export default { title: "Design system|Colors" };

export function Bases() {
  return (
    <div className="ddb-color-example-container">
      <div
        title="primary"
        className="ddb-color-example ddb-color-example--primary-base"
      />
      <div
        title="secondary"
        className="ddb-color-example ddb-color-example--secondary-base"
      />
      <div
        title="black"
        className="ddb-color-example ddb-color-example--black-base"
      />
      <div
        title="charcoal"
        className="ddb-color-example ddb-color-example--charcoal-base"
      />
      <div
        title="white"
        className="ddb-color-example ddb-color-example--white-base"
      />
      <div
        title="grey"
        className="ddb-color-example ddb-color-example--grey-base"
      />
      <div
        title="green"
        className="ddb-color-example ddb-color-example--green-base"
      />
      <div
        title="red"
        className="ddb-color-example ddb-color-example--red-base"
      />
      <div
        title="yellow"
        className="ddb-color-example ddb-color-example--yellow-base"
      />
    </div>
  );
}

export function Alternatives() {
  return (
    <div className="ddb-color-example-container">
      <div
        title="black, overlay"
        className="ddb-color-example ddb-color-example--black-overlay"
      />
      <div
        title="black, overlay-dark"
        className="ddb-color-example ddb-color-example--black-overlay-dark"
      />
      <div
        title="charcoal, opacity-dark"
        className="ddb-color-example ddb-color-example--charcoal-opacity-dark"
      />
      <div
        title="charcoal, opacity-light"
        className="ddb-color-example ddb-color-example--charcoal-opacity-light"
      />
      <div
        title="white, opacity-dark"
        className="ddb-color-example ddb-color-example--white-opacity-dark"
      />
      <div
        title="white, opacity-light"
        className="ddb-color-example ddb-color-example--white-opacity-light"
      />
      <div
        title="grey, light"
        className="ddb-color-example ddb-color-example--grey-light"
      />
      <div
        title="grey, medium"
        className="ddb-color-example ddb-color-example--grey-medium"
      />
      <div
        title="grey, dark"
        className="ddb-color-example ddb-color-example--grey-dark"
      />
      <div
        title="grey, darker"
        className="ddb-color-example ddb-color-example--grey-darker"
      />
    </div>
  );
}

export function Text() {
  return (
    <div className="ddb-color-example-container">
      <p
        title="primary, text"
        className="ddb-color-example-text ddb-color-example-text--primary-text"
      >
        primary, text
      </p>
      <p
        title="secondary, text"
        className="ddb-color-example-text ddb-color-example-text--secondary-text"
      >
        secondary, text
      </p>
      <p
        title="green, text"
        className="ddb-color-example-text ddb-color-example-text--green-text"
      >
        green, text
      </p>
      <p
        title="red, text"
        className="ddb-color-example-text ddb-color-example-text--red-text"
      >
        red, text
      </p>
      <p
        title="yellow, text"
        className="ddb-color-example-text ddb-color-example-text--yellow-text"
      >
        yellow, text
      </p>
      <p
        title="yellow, text"
        className="ddb-color-example-text ddb-color-example-text--yellow-text"
      >
        yellow, text
      </p>
      <p
        title="text"
        className="ddb-color-example-text ddb-color-example-text--text"
      >
        text
      </p>
      <p
        title="text, standard"
        className="ddb-color-example-text ddb-color-example-text--text-standard"
      >
        text, standard
      </p>
      <p
        title="link"
        className="ddb-color-example-text ddb-color-example-text--link"
      >
        link
      </p>
      <p
        title="link, dark"
        className="ddb-color-example-text ddb-color-example-text--link-dark"
      >
        link, dark
      </p>
    </div>
  );
}
