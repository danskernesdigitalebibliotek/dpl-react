import React from "react";
import PropTypes from "prop-types";
import { useId } from "@reach/auto-id";

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
  children,
  label,
  id
}) {
  const generatedId = useId(id);
  return (
    /* * JSX line disabled for ESLint due to questionable rule implementation
     * https://github.com/yannickcr/eslint-plugin-react/issues/1555 */
    <>
      {label && (
        <label className="ddb-btn__label" htmlFor={generatedId}>
          {label}
        </label>
      )}
      {/* eslint-disable-next-line react/button-has-type */}
      <button
        id={generatedId}
        type={type}
        className={`ddb-reset ddb-btn ddb-btn--${variant} ddb-btn--align-${align} ${className}`}
        onClick={onClick}
        tabIndex={tabIndex}
      >
        {children}
      </button>
    </>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(["blank", "black", "grey", "secondary", "charcoal"]),
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  tabIndex: PropTypes.string,
  align: PropTypes.oneOf(["left", "center", "right"]),
  type: PropTypes.oneOf(["button", "submit"]),
  label: PropTypes.string,
  id: PropTypes.string
};

Button.defaultProps = {
  className: "",
  variant: "grey",
  align: "center",
  onClick: undefined,
  tabIndex: "0",
  type: "button",
  label: undefined,
  id: undefined
};

export default Button;
