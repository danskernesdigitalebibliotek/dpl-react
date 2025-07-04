import React from "react";
import Arrow from "../atoms/icons/arrow/arrow";

export interface ArrowButtonProps {
  cursorPointer: boolean;
  clickEventHandler?: () => void;
  keyUpEventHandler?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  arrowLabelledBy: string;
  classNames?: string;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({
  cursorPointer = false,
  clickEventHandler,
  keyUpEventHandler,
  arrowLabelledBy,
  classNames = ""
}) => {
  const pointer = (cursorPointer && { cursor: "pointer" }) || {
    cursor: "inherit"
  };
  return (
    <button
      aria-labelledby={arrowLabelledBy}
      className={`${classNames} arrow-button`}
      style={pointer}
      type="button"
      onMouseUp={(e) => {
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
