import * as React from "react";
import { totalMaterials } from "../../../../apps/material/helper";
import { useGetHoldingsV3 } from "../../../../core/fbs/fbs";
import { convertPostIdToFaustId } from "../../../../core/utils/helpers/general";
import { Pid } from "../../../../core/utils/types/ids";
import StockAndReservationInfo from "../../StockAndReservationInfo";
import MaterialAvailabilityTextParagraph from "../generic/MaterialAvailabilityTextParagraph";

interface MaterialAvailabilityTextPhysicalProps {
  pid: Pid;
}

const MaterialAvailabilityTextPhysical: React.FC<
  MaterialAvailabilityTextPhysicalProps
> = ({ pid }) => {
  const faustId = convertPostIdToFaustId(pid);
  const { data, isLoading, isError } = useGetHoldingsV3({
    recordid: [faustId]
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
