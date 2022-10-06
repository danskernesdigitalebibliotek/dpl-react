import React, { FC, ReactNode } from "react";
import { useText } from "../../../../core/utils/text";

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
  const t = useText();

  return (
    <div
      className="list-reservation__counter"
      aria-label={t("loanListStatusCircleIconAriaLabelText")}
    >
      <div
        role="progressbar"
        className="counter"
        aria-hidden
        style={{
          background: `radial-gradient( closest-side, var(--parent-bg-color) calc(100% - 3px), transparent calc(100% - 2px), transparent 0 100% ), conic-gradient(${color} ${percent}%, #DBDBDB 0)`
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default StatusCircleIcon;
