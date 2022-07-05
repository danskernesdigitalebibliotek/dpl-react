import React from "react";

const Arrow = () => {
  return (
    <svg
      width="61"
      height="9"
      viewBox="0 0 61 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path className="arrow__body" d="M60 4.5H0" stroke="black" />
      <path
        className="arrow__head"
        d="M60.3537 4.85355C60.5489 4.65829 60.5489 4.34171 60.3537 4.14645L57.1717 0.96447C56.9764 0.769208 56.6598 0.769208 56.4646 0.96447C56.2693 1.15973 56.2693 1.47631 56.4646 1.67157L59.293 4.5L56.4646 7.32843C56.2693 7.52369 56.2693 7.84027 56.4646 8.03553C56.6598 8.2308 56.9764 8.2308 57.1717 8.03553L60.3537 4.85355ZM60.0001 4H57.0001V5H60.0001V4Z"
        fill="black"
      />
    </svg>
  );
};

export default Arrow;
