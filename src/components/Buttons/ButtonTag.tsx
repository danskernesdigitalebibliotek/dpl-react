import clsx from "clsx";
import React from "react";

type ButtonTagProps = {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  size?: "small" | "large";
  selected?: boolean;
};

const ButtonTag: React.FunctionComponent<ButtonTagProps> = ({
  onClick,
  selected,
  children,
  size
}) => {
  const className = clsx(
    "tag",
    selected && "tag--fill",
    size && `tag--${size}`,
    "cursor-pointer"
  );

  return (
    <button
      type="button"
      aria-pressed={selected}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonTag;
