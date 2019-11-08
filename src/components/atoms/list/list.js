import React from "react";

/**
 * A simple unordered list that serves as the foundation of all lists.
 *
 * @export
 * @param {Object} props
 * @returns {ReactNode}
 */
export function UnorderedList(props) {
  return <ul className="list" {...props} />;
}

export default UnorderedList;
