import * as React from "react";
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
  const faustId = convertPostIdToFaustId(pid as Pid);
  const { data, isLoading, isError } = useGetHoldingsV3({
    recordid: [String(faustId)]
  });

  if (isLoading || isError || !data) return null;

  const totalReservations = data[0].reservations;
  const totalMaterials = data[0].holdings.reduce(
    (acc, curr) => acc + curr.materials.length,
    0
  );

  return (
    <MaterialAvailabilityTextParagraph>{`${t(
      "weHaveShoppedText"
    )} ${totalMaterials} ${t("copiesThereIsText")} ${totalReservations} ${t(
      "reservationsForThisMaterialText"
    )}`}</MaterialAvailabilityTextParagraph>
  );
};

export default MaterialAvailabilityTextPhysical;
