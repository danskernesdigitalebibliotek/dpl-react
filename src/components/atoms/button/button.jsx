import React from "react";
import PropTypes from "prop-types";
import urlPropType from "url-prop-type";
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
  href,
  variant,
  align,
  onClick,
  tabIndex,
  children,
  label,
  id
}) {
  const generatedId = useId(id);
  const Component = href ? "a" : "button";
  return (
    /* * JSX line disabled for ESLint due to questionable rule implementation
     * https://github.com/yannickcr/eslint-plugin-react/issues/1555 */
    <>
      {label && !href && (
        <label className="dpl-btn__label" htmlFor={generatedId}>
          {label}
        </label>
      )}
      {/* eslint-disable-next-line react/button-has-type */}
      <Component
        id={generatedId}
        href={href}
        type={!href ? type : undefined}
        className={`dpl-reset dpl-btn dpl-btn--${variant} dpl-btn--align-${align} ${className}`}
        onClick={!href ? onClick : undefined}
        tabIndex={tabIndex}
      >
        {children}
      </Component>
    </>
  );
}

Button.propTypes = {
  href: urlPropType,
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
  href: undefined,
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
