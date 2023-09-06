import React from "react";
import Arrow from "../atoms/icons/arrow/arrow";

export interface ArrowButtonProps {
  cursorPointer: boolean;
  clickEventHandler?: () => void;
  arrowLabelledBy: string;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({
  cursorPointer = false,
  clickEventHandler,
  arrowLabelledBy
}) => {
  const pointer = (cursorPointer && { cursor: "pointer" }) || {
    cursor: "inherit"
  };
  return (
    <button
      aria-labelledby={arrowLabelledBy}
      style={pointer}
      type="button"
      onClick={clickEventHandler}
    >
      <Arrow />
    </button>
  );
};
export default ArrowButton;
