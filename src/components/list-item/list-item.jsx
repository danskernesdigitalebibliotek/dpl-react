import React from "react";
import PropTypes from "prop-types";

function ListItem({ className, children, childrenClass, aside, asideClass }) {
  return (
    <li className={`dpl-list-item ${className}`}>
      <article className={`dpl-list-item__children ${childrenClass}`}>
        {children}
      </article>
      <aside className={`dpl-list-item__aside ${asideClass}`}>{aside}</aside>
    </li>
  );
}

ListItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  childrenClass: PropTypes.string,
  aside: PropTypes.node.isRequired,
  asideClass: PropTypes.string
};

ListItem.defaultProps = {
  className: "",
  childrenClass: "",
  asideClass: ""
};

export default ListItem;
