import React, { FC } from "react";
import Link from "../../../../components/atoms/links/Link";
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
  const t = useText();
  const u = useUrls();
  const viewFeesAndCompensationRatesUrl = u("viewFeesAndCompensationRatesUrl");

  if (!dueDate || (dueDate && !materialIsOverdue(dueDate))) return null;

  return (
    <Link
      href={viewFeesAndCompensationRatesUrl}
      className={`list-reservation__note list-reservation__note--${showOn} color-signal-alert`}
    >
      {t("loanListMaterialLateFeeText")}
    </Link>
  );
};

export default MaterialOverdueLink;
