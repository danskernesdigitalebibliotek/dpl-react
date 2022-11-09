import * as React from "react";
import { FC } from "react";
import { useText } from "../../core/utils/text";

export interface StockAndReservationInfoProps {
  stockCount: number;
  reservationCount: number;
}

const StockAndReservationInfo: FC<StockAndReservationInfoProps> = ({
  stockCount,
  reservationCount
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

  return (
    <>
      {materialsInStockInfoText && `${materialsInStockInfoText}.`}{" "}
      {materialReservationInfoText && materialReservationInfoText}
    </>
  );
};

export default StockAndReservationInfo;
