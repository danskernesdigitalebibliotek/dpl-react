import React, { FC, ReactNode } from "react";
import { getColors } from "../../../../core/utils/helpers/general";

interface StatusCircleIconProps {
  color: string;
  ariaLabel: string;
  percent: number;
  children: ReactNode;
}

const StatusCircleIcon: FC<StatusCircleIconProps> = ({
  color,
  ariaLabel,
  percent,
  children
}) => {
  const { default: defaultColor } = getColors();
  const usedColor = color || defaultColor;

  return (
    <div aria-label={ariaLabel}>
      <div
        className="counter"
        aria-hidden
        style={{
          background: `radial-gradient( closest-side, var(--parent-bg-color) calc(100% - 3px), transparent calc(100% - 2px), transparent 0 100% ), conic-gradient(${usedColor} ${percent}%, #DBDBDB 0)`
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default StatusCircleIcon;
