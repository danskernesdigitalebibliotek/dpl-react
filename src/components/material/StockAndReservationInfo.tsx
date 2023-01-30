import * as React from "react";
import { FC } from "react";
import { useText } from "../../core/utils/text";

export interface StockAndReservationInfoProps {
  stockCount: number;
  reservationCount: number;
  numberInQueue?: number;
}

const StockAndReservationInfo: FC<StockAndReservationInfoProps> = ({
  stockCount,
  reservationCount,
  numberInQueue
}) => {
  const t = useText();
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
      {numberInQueueText && `${numberInQueueText} `}
      {materialsInStockInfoText && `${materialsInStockInfoText} `}
      {materialReservationInfoText && materialReservationInfoText}
    </>
  );
};

export default StockAndReservationInfo;
