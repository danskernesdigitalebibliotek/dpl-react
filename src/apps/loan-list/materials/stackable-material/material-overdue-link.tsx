import React, { FC } from "react";
import { materialIsOverdue } from "../../utils/helpers";

interface MaterialOverdueLinkProps {
  dueDate: string | null | undefined;
  label: string | null | undefined;
  showOn: "mobile" | "desktop";
}

const MaterialOverdueLink: FC<MaterialOverdueLinkProps> = ({
  dueDate,
  label,
  showOn
}) => {
  if (!dueDate || (dueDate && !materialIsOverdue(dueDate))) return <div />;

  return (
    <a
      href="todo"
      id={`test-material-overdue-${showOn}`}
      className={`list-reservation__note-${showOn} color-signal-alert`}
    >
      {label}
    </a>
  );
};

export default MaterialOverdueLink;
