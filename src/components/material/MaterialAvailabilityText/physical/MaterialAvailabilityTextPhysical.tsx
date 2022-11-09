import * as React from "react";
import { totalMaterials } from "../../../../apps/material/helper";
import { useGetHoldingsV3 } from "../../../../core/fbs/fbs";
import { convertPostIdToFaustId } from "../../../../core/utils/helpers/general";
import { useText } from "../../../../core/utils/text";
import { Pid } from "../../../../core/utils/types/ids";
import MaterialAvailabilityTextParagraph from "../generic/MaterialAvailabilityTextParagraph";

interface MaterialAvailabilityTextPhysicalProps {
  pid: Pid;
}

const MaterialAvailabilityTextPhysical: React.FC<
  MaterialAvailabilityTextPhysicalProps
> = ({ pid }) => {
  const t = useText();
  const faustId = convertPostIdToFaustId(pid);
  const { data, isLoading, isError } = useGetHoldingsV3({
    recordid: [faustId]
  });

  if (isLoading || isError || !data) return null;

  const { reservations, holdings } = data[0];

  const materialsInStockInfoText = t("materialsInStockInfoText", {
    count: totalMaterials(holdings),
    placeholders: { "@count": totalMaterials(holdings) }
  });
  const materialReservationInfoText = t("materialReservationInfoText", {
    count: reservations,
    placeholders: { "@count": reservations }
  });

  return (
    <MaterialAvailabilityTextParagraph>
      {materialsInStockInfoText}. {materialReservationInfoText}
    </MaterialAvailabilityTextParagraph>
  );
};

export default MaterialAvailabilityTextPhysical;
