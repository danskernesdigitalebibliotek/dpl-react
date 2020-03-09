import React from "react";
import PropTypes from "prop-types";

/**
 * Creates a list of a certain length with undefined items in it.
 * Mostly used for skeleton creation.
 *
 * @export
 * @param {number} length - length of array with undefined items.
 * @returns {undefined[]}
 */
export function getList(length) {
  return Array.from(new Array(length));
}

/**
 * Loader that is to be composed for the individual components and
 * apps loading states.
 *
 * @export
 * @param {object} props
 * @param {string} props.component
 * @param {string} props.height
 * @param {string} props.width
 * @param {string} props.mt marginTop
 * @param {string} props.mb marginBottom
 * @param {string} props.mr marginRight
 * @param {string} props.ml marginLeft
 * @param {string} props.br borderRadius
 * @param {object} props.style
 * @returns {ReactNode}
 */
function Skeleton({
  component: Component,
  height,
  width,
  br,
  mt,
  mb,
  mr,
  ml,
  style
}) {
  return (
    <Component
      className="ddb-reset ddb-skeleton"
      style={{
        width,
        height,
        borderRadius: br,
        marginTop: mt,
        marginBottom: mb,
        marginRight: mr,
        marginLeft: ml,
        ...style
      }}
    />
  );
}

const pixelType = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

Skeleton.propTypes = {
  component: PropTypes.string,
  height: pixelType,
  width: pixelType,
  mt: pixelType,
  mb: pixelType,
  mr: pixelType,
  ml: pixelType,
  br: pixelType,
  style: PropTypes.objectOf(PropTypes.any) // This is weird? https://github.com/yannickcr/eslint-plugin-react/issues/2079#issuecomment-447358434
};

Skeleton.defaultProps = {
  component: "div",
  height: "16px",
  width: "100%",
  br: "5px",
  mt: "5px",
  mb: "5px",
  mr: "5px",
  ml: "5px",
  style: {}
};

export default Skeleton;
