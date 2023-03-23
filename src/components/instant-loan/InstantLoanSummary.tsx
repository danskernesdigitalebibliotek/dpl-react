import React from "react";
import ExpandMore from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import { useText } from "../../core/utils/text";
import { Pid } from "../../core/utils/types/ids";
import { Cover } from "../cover/cover";

type InstantLoanSummaryProps = {
  pid: Pid;
  className?: string;
};

const InstantLoanSummary: React.FunctionComponent<InstantLoanSummaryProps> = ({
  pid,
  className
}) => {
  const t = useText();
  return (
    <div className={className}>
      <div className="pagefold-triangle--small" />
      <Cover id={pid} size="small" animate />
      <div>
        <h2 className="text-header-h4 mt-22 mb-4">
          {t("instantLoanTitleText")}
        </h2>
        <p className="text-small-caption">{t("instantLoanSubTitleText")}</p>
        <div className="instant-loan-underline mt-35">
          <p className="link-tag text-small-caption">
            {t("instantLoanUnderlineDescriptionText")}
          </p>
          <img
            className="instant-loan-arrow"
            src={ExpandMore}
            alt="various-icon"
          />
        </div>
      </div>
    </div>
  );
};

export default InstantLoanSummary;
