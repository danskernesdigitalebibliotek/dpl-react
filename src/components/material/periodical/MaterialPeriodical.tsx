import { isEmpty } from "lodash";
import React, { FC } from "react";
import { useConfig } from "../../../core/utils/config";
import { groupObjectArrayByProperty } from "../../../core/utils/helpers/general";
import { FaustId } from "../../../core/utils/types/ids";
import { GroupList, PeriodicalEdition } from "./helper";
import MaterialPeriodicalSelect from "./MaterialPeriodicalSelect";
import { useGetHoldings } from "../../../apps/material/helper";

export interface MaterialPeriodicalProps {
  faustId: FaustId;
  selectedPeriodical: PeriodicalEdition | null;
  selectPeriodicalHandler: (selectedPeriodical: PeriodicalEdition) => void;
  isYearbook?: boolean;
}

const MaterialPeriodical: FC<MaterialPeriodicalProps> = ({
  faustId,
  selectedPeriodical,
  selectPeriodicalHandler,
  isYearbook = false
}) => {
  const config = useConfig();

  const { data, isLoading, isError } = useGetHoldings({
    faustIds: [faustId],
    config,
    blacklist: "pickup"
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

  const groupByVolumeYear = groupObjectArrayByProperty(
    materialsPeriodical,
    "volumeYear"
  );

  if (
    !groupByVolumeYear ||
    !selectPeriodicalHandler ||
    isEmpty(groupByVolumeYear)
  ) {
    return null;
  }

  return (
    <MaterialPeriodicalSelect
      groupList={groupByVolumeYear as GroupList}
      selectedPeriodical={selectedPeriodical}
      selectPeriodicalHandler={selectPeriodicalHandler}
      isReleasedYearly={isYearbook}
    />
  );
};
export default MaterialPeriodical;
