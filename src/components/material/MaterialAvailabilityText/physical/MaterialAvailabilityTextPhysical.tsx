import * as React from "react";
import {
  getTotalHoldings,
  getTotalReservations,
  useGetHoldings
} from "../../../../apps/material/helper";
import { convertPostIdsToFaustIds } from "../../../../core/utils/helpers/general";
import { Pid } from "../../../../core/utils/types/ids";
import StockAndReservationInfo from "../../StockAndReservationInfo";
import MaterialAvailabilityTextParagraph from "../generic/MaterialAvailabilityTextParagraph";
import { useConfig } from "../../../../core/utils/config";

interface MaterialAvailabilityTextPhysicalProps {
  pids: Pid[];
}

const MaterialAvailabilityTextPhysical: React.FC<
  MaterialAvailabilityTextPhysicalProps
> = ({ pids }) => {
  const config = useConfig();
  const faustIds = convertPostIdsToFaustIds(pids);
  const { data, isLoading, isError } = useGetHoldings({
    faustIds,
    config
  });

  if (isLoading || isError || !data) return null;

  const holdings = getTotalHoldings(data);
  const reservations = getTotalReservations(data);

  return (
    <MaterialAvailabilityTextParagraph>
      <StockAndReservationInfo
        stockCount={holdings}
        reservationCount={reservations}
      />
    </MaterialAvailabilityTextParagraph>
  );
};

export default MaterialAvailabilityTextPhysical;
