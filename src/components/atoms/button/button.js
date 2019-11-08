import React from "react";
import { string } from 'prop-types'

/**
 * A simple button that serves as the foundation of all buttons.
 *
 * @export
 * @param {Object} props
 * @returns {ReactNode}
 */
export function Button({ className, ...rest }) {
  return <button className={`btn ${className}`} {...rest} />;
}

Button.propTypes = {
  className: string
}

export default Button;
