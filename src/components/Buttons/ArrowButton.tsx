import React from "react";
import Arrow from "../atoms/icons/arrow/arrow";

export interface ArrowButtonProps {
  cursorPointer: boolean;
  clickEventHandler?: () => void;
  keyUpEventHandler?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  arrowLabelledBy: string;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({
  cursorPointer = false,
  clickEventHandler,
  keyUpEventHandler,
  arrowLabelledBy
}) => {
  const pointer = (cursorPointer && { cursor: "pointer" }) || {
    cursor: "inherit"
  };
  return (
    <button
      aria-labelledby={arrowLabelledBy}
      className="arrow-button"
      style={pointer}
      type="button"
      onClick={(e) => {
        if (clickEventHandler) {
          e.stopPropagation();
          clickEventHandler();
        }
      }}
      onKeyUp={(e) => {
        if (keyUpEventHandler) {
          e.stopPropagation();
          keyUpEventHandler(e);
        }
      }}
    >
      <Arrow />
    </button>
  );
};
export default ArrowButton;
