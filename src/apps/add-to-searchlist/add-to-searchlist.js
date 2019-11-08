import React from "react";
import PropTypes from "prop-types";

import Button from "../../components/atoms/button/button.js";

export function AddToSearchlist({ children }) {
  return <Button>{children}</Button>;
}

AddToSearchlist.defaultProps = {
  children: "Tilføj til mine søgninger"
};

AddToSearchlist.propTypes = {
  children: PropTypes.node
};

export default AddToSearchlist;
