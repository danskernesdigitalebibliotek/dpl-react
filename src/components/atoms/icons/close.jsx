import React from "react";
import PropTypes from "prop-types";

function Close({ className, variant, size }) {
  return (
    <svg
      height={`${size}px`}
      width={`${size}px`}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      viewBox="0 0 100 100"
      xmlSpace="preserve"
      className={`ddb-icon ddb-icon--${variant} ${className}`}
    >
      <g>
        <path d="M93.2,98.8c-1.5,0-3-0.6-4.1-1.7L2.7,11.1C0.4,8.9,0.4,5.2,2.7,3c2.3-2.3,5.9-2.3,8.2,0l86.4,85.9c2.3,2.3,2.3,5.9,0,8.2   C96.2,98.2,94.7,98.8,93.2,98.8z" />
        <path d="M6.8,98.8c-1.5,0-3-0.6-4.1-1.7c-2.3-2.3-2.2-5.9,0-8.2L89.1,2.9c2.3-2.3,5.9-2.2,8.2,0c2.3,2.3,2.2,5.9,0,8.2L10.9,97.1   C9.7,98.2,8.3,98.8,6.8,98.8z" />
      </g>
    </svg>
  );
}

Close.defaultProps = {
  variant: "grey",
  className: "",
  size: 18
};

Close.propTypes = {
  variant: PropTypes.oneOf(["grey", "red"]),
  className: PropTypes.string,
  size: PropTypes.number
};

export default Close;
