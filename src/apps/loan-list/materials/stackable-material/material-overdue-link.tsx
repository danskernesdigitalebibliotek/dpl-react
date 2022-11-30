import React, { FC } from "react";
import { Link } from "../../../../components/atoms/link";
import { useText } from "../../../../core/utils/text";
import { useUrls } from "../../../../core/utils/url";
import { materialIsOverdue } from "../../../../core/utils/helpers/general";

interface MaterialOverdueLinkProps {
  dueDate: string | null | undefined;
  showOn: "mobile" | "desktop";
}

const MaterialOverdueLink: FC<MaterialOverdueLinkProps> = ({
  dueDate,
  showOn
}) => {
  const { materialOverdueUrl } = useUrls();
  const t = useText();
  if (!dueDate || (dueDate && !materialIsOverdue(dueDate))) return null;

  return (
    <Link
      href={materialOverdueUrl}
      className={`list-reservation__note list-reservation__note--${showOn} color-signal-alert`}
    >
      {t("loanListMaterialLateFeeText")}
    </Link>
  );
};

export default MaterialOverdueLink;
