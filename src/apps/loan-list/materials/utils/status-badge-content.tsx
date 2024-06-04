import clsx from "clsx";
import React, { FC } from "react";

interface StatusBadgeContentProps {
  statusLabelType: "danger" | "warning" | "neutral" | "info";
  text: string;
  isMobileVersion?: boolean;
}

const StatusBadgeContent: FC<StatusBadgeContentProps> = ({
  statusLabelType,
  text,
  isMobileVersion = false
}) => {
  return (
    <div
      className={clsx(`status-label status-label--${statusLabelType}`, [
        { "hide-on-desktop ml-16": isMobileVersion }
      ])}
    >
      {text}
    </div>
  );
};

export default StatusBadgeContent;
