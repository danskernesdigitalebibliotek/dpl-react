import React, { FC, ReactNode } from "react";

interface StatusCircleIconProps {
  color: string;
  percent: number;
  children: ReactNode;
}

const StatusCircleIcon: FC<StatusCircleIconProps> = ({
  color,
  percent,
  children
}) => {
  return (
    <div
      className="counter"
      aria-hidden
      style={{
        background: `radial-gradient( closest-side, var(--parent-bg-color) calc(100% - 3px), transparent calc(100% - 2px), transparent 0 100% ), conic-gradient(${color} ${percent}%, #DBDBDB 0)`
      }}
    >
      {children}
    </div>
  );
};

export default StatusCircleIcon;
