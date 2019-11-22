import React from "react";
import PropTypes from "prop-types";

/**
 * Loader that is to be composed for the individual components and
 * apps loading states.
 *
 * @export
 * @param {object} props
 * @param {string} props.component
 * @param {string} props.height
 * @param {string} props.width
 * @param {string} props.variant
 * @param {string} props.borderRadius
 * @param {string} props.className
 * @returns {ReactNode}
 */
export function Skeleton({
  component: Component = "div",
  height = "16px",
  width = "100%",
  borderRadius = "5%",
  mt = "5px",
  mb = "5px",
  className,
  style = {},
  ...rest
}) {
  return (
    <Component
      className={`ddb-reset ddb-skeleton ${!className ? "" : className}`}
      style={{
        width,
        height,
        borderRadius,
        marginTop: mt,
        marginBottom: mb,
        ...style
      }}
      {...rest}
    />
  );
}

Skeleton.propTypes = {
  component: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  mt: PropTypes.string,
  mb: PropTypes.string,
  borderRadius: PropTypes.string,
  variant: PropTypes.oneOf(["rect", "circle"]),
  style: PropTypes.object,
  className: PropTypes.string
};

export default Skeleton;
