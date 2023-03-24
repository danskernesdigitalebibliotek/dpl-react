import React from "react";
import Arrow from "../atoms/icons/arrow/arrow";

export interface ArrowButtonProps {
  cursorPointer: boolean;
  clickEventHandler?: () => void;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({
  cursorPointer = false,
  clickEventHandler
}) => {
  const pointer = (cursorPointer && { cursor: "pointer" }) || {
    cursor: "inherit"
  };
  return (
    <button style={pointer} type="button" onClick={clickEventHandler}>
      <Arrow />
    </button>
  );
};
export default ArrowButton;
