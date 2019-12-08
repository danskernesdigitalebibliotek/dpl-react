import React from "react";
import PropTypes from "prop-types";

/**
 * A simple button that serves as the foundation of all buttons.
 *
 * @export
 * @param {Object} props
 * @returns {ReactNode}
 */
function Button({
  className,
  type,
  variant,
  align,
  onClick,
  tabIndex,
  children
}) {
  return (
    /*
     * JSX line disabled for ESLint due to questionable rule implementation
     * https://github.com/yannickcr/eslint-plugin-react/issues/1555
     */
    // eslint-disable-next-line react/button-has-type
    <button
      type={type}
      className={`ddb-reset ddb-btn ddb-btn--${variant} ddb-btn--align-${align} ${className}`}
      onClick={onClick}
      tabIndex={tabIndex}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(["blank", "black", "grey", "secondary", "charcoal"]),
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  tabIndex: PropTypes.string,
  align: PropTypes.oneOf(["left", "center", "right"]),
  type: PropTypes.oneOf(["button", "submit"])
};

Button.defaultProps = {
  className: "",
  variant: "grey",
  align: "center",
  onClick: undefined,
  tabIndex: "0",
  type: "button"
};

export default Button;
