import React from "react";
import PropTypes from "prop-types";

function ListItem({ children, childrenClass, aside, asideClass }) {
  return (
    <li className="ddb-list-item">
      <section className="ddb-list-item__container">
        <article className={`ddb-list-item__children ${childrenClass}`}>
          {children}
        </article>
        <aside className={`ddb-list-item__aside ${asideClass}`}>{aside}</aside>
      </section>
    </li>
  );
}

ListItem.propTypes = {
  children: PropTypes.node.isRequired,
  childrenClass: PropTypes.string,
  aside: PropTypes.node.isRequired,
  asideClass: PropTypes.string
};

ListItem.defaultProps = {
  childrenClass: "",
  asideClass: ""
};

export default ListItem;
