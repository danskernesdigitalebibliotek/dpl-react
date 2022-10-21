import clsx from "clsx";
import React from "react";

type TagProps = {
  children: React.ReactNode;
  onClick?: () => void;
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
      className={clsx(
        "tag tag--outlined",
        selected && "tag--outlined-selected"
      )}
      onClick={onClick ?? undefined}
    >
      {children}
    </button>
  );
};

export default Tag;
