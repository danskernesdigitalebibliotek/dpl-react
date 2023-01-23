import * as React from "react";
import { totalMaterials } from "../../../../apps/material/helper";
import { useGetHoldingsV3 } from "../../../../core/fbs/fbs";
import { convertPostIdsToFaustIds } from "../../../../core/utils/helpers/general";
import { Pid } from "../../../../core/utils/types/ids";
import StockAndReservationInfo from "../../StockAndReservationInfo";
import MaterialAvailabilityTextParagraph from "../generic/MaterialAvailabilityTextParagraph";

interface MaterialAvailabilityTextPhysicalProps {
  pids: Pid[];
}

const MaterialAvailabilityTextPhysical: React.FC<
  MaterialAvailabilityTextPhysicalProps
> = ({ pids }) => {
  const faustIds = convertPostIdsToFaustIds(pids);
  const { data, isLoading, isError } = useGetHoldingsV3({
    recordid: faustIds
  });

  if (isLoading || isError || !data) return null;

  const { reservations, holdings } = data[0];

  return (
    <MaterialAvailabilityTextParagraph>
      <StockAndReservationInfo
        stockCount={totalMaterials(holdings)}
        reservationCount={reservations}
      />
    </MaterialAvailabilityTextParagraph>
  );
};

export default MaterialAvailabilityTextPhysical;
