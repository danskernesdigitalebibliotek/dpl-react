import React from "react";
import { useText } from "../../../core/utils/text";

export const ReservationLabelWithOptionalStockInfo = ({
  label,
  holdings
}: {
  label: string;
  holdings?: number;
}) => {
  const t = useText();
  const holdingText = holdings
    ? t("materialsInStockInfoText", {
        count: holdings,
        placeholders: { "@count": holdings }
      })
    : null;

  if (holdings) {
    return (
      <>
        <p className="text-small-caption">{label}</p>
        <p className="text-small-caption">{holdingText}</p>
      </>
    );
  }
  return <p className="text-small-caption">{label}</p>;
};
