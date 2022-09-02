import * as React from "react";
import { FC } from "react";
import { useGetHoldingsV3 } from "../../core/fbs/fbs";
import { groupObjectArrayByProperty } from "../../core/utils/helpers/general";
import { FaustId } from "../../core/utils/types/ids";
import MaterialPeriodikumSelect from "./MaterialPeriodikumSelect";

export interface MaterialPeriodikumProps {
  faustId: FaustId;
  selectPeriodikumSelect: (periodikumSelect: string | null) => void;
}

const MaterialPeriodikum: FC<MaterialPeriodikumProps> = ({
  faustId,
  selectPeriodikumSelect
}) => {
  const { data, isLoading, isError } = useGetHoldingsV3({
    recordid: [String(faustId)]
  });

  if (isLoading || isError || !data) return null;

  // This make a array of all periodikum editions
  const materialsPeriodical = data[0]?.holdings
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
    <MaterialPeriodikumSelect
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      groupList={groupObjectArrayByProperty(materialsPeriodical, "volumeYear")}
      selectPeriodikumSelect={selectPeriodikumSelect}
    />
  );
};

export default MaterialPeriodikum;
