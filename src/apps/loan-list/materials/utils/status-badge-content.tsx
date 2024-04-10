import clsx from "clsx";
import React, { FC } from "react";

interface StatusBadgeContentProps {
  statusLabelType: "danger" | "warning" | "neutral" | "info";
  text: string;
  mobileVersion?: boolean;
}

const StatusBadgeContent: FC<StatusBadgeContentProps> = ({
  statusLabelType,
  text,
  mobileVersion = false
}) => {
  return (
    <div
      className={clsx(
        `status-label status-label--${{
          statusLabelType
        }}`,
        [{ "hide-on-desktop ml-16": mobileVersion }]
      )}
    >
      {text}
    </div>
  );
};

export default StatusBadgeContent;
