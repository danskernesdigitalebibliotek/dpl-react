import React, { FC } from "react";
import { isMobile } from "react-device-detect";
import { materialIsOverdue } from "../../utils/helpers";

interface MaterialOverdueLinkProps {
  dueDate: string | null | undefined;
  label: string | null | undefined;
}

const MaterialOverdueLink: FC<MaterialOverdueLinkProps> = ({
  dueDate,
  label
}) => {
  if (!dueDate || (dueDate && !materialIsOverdue(dueDate))) return <div />;

  return (
    <a
      href="todo"
      className={`list-reservation__note-${
        isMobile ? "mobile" : "desktop"
      } color-signal-alert`}
    >
      {label}
    </a>
  );
};

export default MaterialOverdueLink;
