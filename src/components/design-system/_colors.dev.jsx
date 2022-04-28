import React from "react";
import "./_colors.dev.scss";

export default { title: "Design system/Colors" };

export function Bases() {
  return (
    <div className="dpl-color-example-container">
      <div
        title="primary"
        className="dpl-color-example dpl-color-example--primary-base"
      />
      <div
        title="secondary"
        className="dpl-color-example dpl-color-example--secondary-base"
      />
      <div
        title="black"
        className="dpl-color-example dpl-color-example--black-base"
      />
      <div
        title="charcoal"
        className="dpl-color-example dpl-color-example--charcoal-base"
      />
      <div
        title="white"
        className="dpl-color-example dpl-color-example--white-base"
      />
      <div
        title="grey"
        className="dpl-color-example dpl-color-example--grey-base"
      />
      <div
        title="green"
        className="dpl-color-example dpl-color-example--green-base"
      />
      <div
        title="red"
        className="dpl-color-example dpl-color-example--red-base"
      />
      <div
        title="yellow"
        className="dpl-color-example dpl-color-example--yellow-base"
      />
    </div>
  );
}

export function Alternatives() {
  return (
    <div className="dpl-color-example-container">
      <div
        title="black, overlay"
        className="dpl-color-example dpl-color-example--black-overlay"
      />
      <div
        title="black, overlay-dark"
        className="dpl-color-example dpl-color-example--black-overlay-dark"
      />
      <div
        title="charcoal, opacity-dark"
        className="dpl-color-example dpl-color-example--charcoal-opacity-dark"
      />
      <div
        title="charcoal, opacity-light"
        className="dpl-color-example dpl-color-example--charcoal-opacity-light"
      />
      <div
        title="white, opacity-dark"
        className="dpl-color-example dpl-color-example--white-opacity-dark"
      />
      <div
        title="white, opacity-light"
        className="dpl-color-example dpl-color-example--white-opacity-light"
      />
      <div
        title="grey, light"
        className="dpl-color-example dpl-color-example--grey-light"
      />
      <div
        title="grey, medium"
        className="dpl-color-example dpl-color-example--grey-medium"
      />
      <div
        title="grey, dark"
        className="dpl-color-example dpl-color-example--grey-dark"
      />
      <div
        title="grey, darker"
        className="dpl-color-example dpl-color-example--grey-darker"
      />
    </div>
  );
}

export function Text() {
  return (
    <div className="dpl-color-example-container">
      <p
        title="primary, text"
        className="dpl-color-example-text dpl-color-example-text--primary-text"
      >
        primary, text
      </p>
      <p
        title="secondary, text"
        className="dpl-color-example-text dpl-color-example-text--secondary-text"
      >
        secondary, text
      </p>
      <p
        title="green, text"
        className="dpl-color-example-text dpl-color-example-text--green-text"
      >
        green, text
      </p>
      <p
        title="red, text"
        className="dpl-color-example-text dpl-color-example-text--red-text"
      >
        red, text
      </p>
      <p
        title="yellow, text"
        className="dpl-color-example-text dpl-color-example-text--yellow-text"
      >
        yellow, text
      </p>
      <p
        title="text"
        className="dpl-color-example-text dpl-color-example-text--text"
      >
        text
      </p>
      <p
        title="text, standard"
        className="dpl-color-example-text dpl-color-example-text--text-standard"
      >
        text, standard
      </p>
      <p
        title="link"
        className="dpl-color-example-text dpl-color-example-text--link"
      >
        link
      </p>
      <p
        title="link, dark"
        className="dpl-color-example-text dpl-color-example-text--link-dark"
      >
        link, dark
      </p>
    </div>
  );
}
