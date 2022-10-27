import React, { FC } from "react";
import { Link } from "../../../../components/atoms/link";
import { useUrls } from "../../../../core/utils/url";
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
  const { materialOverdueUrl } = useUrls();
  if (!dueDate || (dueDate && !materialIsOverdue(dueDate))) return null;

  return (
    <Link
      href={materialOverdueUrl}
      className={`list-reservation__note-${showOn} color-signal-alert`}
    >
      {label}
    </Link>
  );
};

export default MaterialOverdueLink;
