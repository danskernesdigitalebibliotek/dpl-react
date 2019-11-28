import React from "react";
import PropTypes from "prop-types";

/**
 * A simple unordered list that serves as the foundation of all lists.
 *
 * @export
 * @param {object} props
 * @param {string} props.className
 * @param {ReactNode} props.children
 * @returns {ReactNode}
 */
export function UnorderedList({ className, children }) {
  return <ul className={`ddb-reset list ${className}`}>{children}</ul>;
}

UnorderedList.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

UnorderedList.defaultProps = {
  className: ""
};

export default UnorderedList;
