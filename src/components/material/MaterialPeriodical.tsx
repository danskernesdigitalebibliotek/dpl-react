import * as React from "react";
import { FC } from "react";
import { useGetHoldingsV3 } from "../../core/fbs/fbs";
import { groupObjectArrayByProperty } from "../../core/utils/helpers/general";
import { FaustId } from "../../core/utils/types/ids";
import MaterialPeriodicalSelect from "./MaterialPeriodicalSelect";

export interface MaterialPeriodicalProps {
  faustId: FaustId;
  selectPeriodicalSelect: (periodicalSelect: string | null) => void;
}

const MaterialPeriodical: FC<MaterialPeriodicalProps> = ({
  faustId,
  selectPeriodicalSelect
}) => {
  const { data, isLoading, isError } = useGetHoldingsV3({
    recordid: [String(faustId)]
  });

  if (isLoading || isError || !data) return null;

  // This make a array of all periodical editions
  const materialsPeriodical = data[0].holdings
    // Get all holdings
    .map((holding) => {
      // Make all editions from holdings into one array
      return holding.materials.flat().map((material) => {
        // Return a object that contains editions + itemNumber
        return { ...material.periodical, itemNumber: material.itemNumber };
      });
    })
    .flat();

  return (
    <MaterialPeriodicalSelect
      groupList={groupObjectArrayByProperty(materialsPeriodical, "volumeYear")}
      selectPeriodicalSelect={selectPeriodicalSelect}
    />
  );
};

export default MaterialPeriodical;
