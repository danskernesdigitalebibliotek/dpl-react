import * as React from "react";
import { FC } from "react";
import { useText } from "../../core/utils/text";
import { totalMaterials } from "../../apps/material/helper";
import { HoldingsV3 } from "../../core/fbs/model";

export interface StockAndReservationInfoProps {
  holdings: HoldingsV3[];
  reservationCount: number;
  numberInQueue?: number;
}

const StockAndReservationInfo: FC<StockAndReservationInfoProps> = ({
  holdings,
  reservationCount,
  numberInQueue
}) => {
  const t = useText();
  const stockCount = totalMaterials(holdings);

  const materialsInStockInfoText = t("materialsInStockInfoText", {
    count: stockCount,
    placeholders: { "@count": stockCount }
  });
  const materialReservationInfoText = t("materialReservationInfoText", {
    count: reservationCount,
    placeholders: { "@count": reservationCount }
  });

  const numberInQueueText = numberInQueue
    ? t("numberInQueueText", {
        placeholders: { "@number": numberInQueue }
      })
    : false;

  return (
    <>
      {numberInQueueText && numberInQueueText}
      {materialsInStockInfoText && materialsInStockInfoText}
      {materialReservationInfoText && materialReservationInfoText}
    </>
  );
};

export default StockAndReservationInfo;
