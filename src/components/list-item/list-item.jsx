import React from "react";
import PropTypes from "prop-types";

function ListItem({
  className,
  children,
  childrenClass,
  containerClass,
  aside,
  asideClass,
  footer,
  footerClass
}) {
  return (
    <li className={`ddb-list-item ${className}`}>
      <section className={`ddb-list-item__container ${containerClass}`}>
        <article className={`ddb-list-item__children ${childrenClass}`}>
          {children}
        </article>
        <aside className={`ddb-list-item__aside ${asideClass}`}>{aside}</aside>
      </section>
      {footer && (
        <section className={`ddb-list-item__footer ${footerClass}`}>
          {footer}
        </section>
      )}
    </li>
  );
}

ListItem.propTypes = {
  className: PropTypes.string,
  containerClass: PropTypes.string,
  children: PropTypes.node.isRequired,
  childrenClass: PropTypes.string,
  aside: PropTypes.node.isRequired,
  asideClass: PropTypes.string,
  footer: PropTypes.node,
  footerClass: PropTypes.string
};

ListItem.defaultProps = {
  className: "",
  containerClass: "",
  childrenClass: "",
  asideClass: "",
  footer: undefined,
  footerClass: ""
};

export default ListItem;
