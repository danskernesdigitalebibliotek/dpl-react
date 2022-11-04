import clsx from "clsx";
import React from "react";

type TagProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  selected?: boolean;
};

const Tag: React.FunctionComponent<TagProps> = ({
  onClick,
  selected,
  children
}) => {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={clsx(
        "tag tag--outlined",
        selected && "tag--outlined-selected"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Tag;
