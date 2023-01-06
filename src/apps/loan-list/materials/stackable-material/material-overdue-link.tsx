import React, { FC } from "react";
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
    <a
      href={String(materialOverdueUrl)}
      className={`list-reservation__note list-reservation__note--${showOn} color-signal-alert`}
    >
      {t("loanListMaterialLateFeeText")}
    </a>
  );
};

export default MaterialOverdueLink;
