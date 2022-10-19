import React, { FC } from "react";
import { useGetHoldingsV3 } from "../../../core/fbs/fbs";
import { useConfig } from "../../../core/utils/config";
import { groupObjectArrayByProperty } from "../../../core/utils/helpers/general";
import { FaustId } from "../../../core/utils/types/ids";
import { PeriodicalEdition } from "./helper";
import MaterialPeriodicalSelect, {
  GroupList
} from "./MaterialPeriodicalSelect";

export interface MaterialPeriodicalProps {
  faustId: FaustId;
  selectedPeriodical: PeriodicalEdition | null;
  selectPeriodicalHandler: (selectedPeriodical: PeriodicalEdition) => void;
}

const MaterialPeriodical: FC<MaterialPeriodicalProps> = ({
  faustId,
  selectedPeriodical,
  selectPeriodicalHandler
}) => {
  const config = useConfig();
  const blacklistBranches = config("blacklistedPickupBranchesConfig", {
    transformer: "stringToArray"
  });
  const { data, isLoading, isError } = useGetHoldingsV3({
    recordid: [String(faustId)],
    ...(blacklistBranches ? { exclude: blacklistBranches } : {})
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

  return (
    <MaterialPeriodicalSelect
      groupList={groupByVolumeYear as GroupList}
      selectedPeriodical={selectedPeriodical}
      selectPeriodicalHandler={selectPeriodicalHandler}
    />
  );
};
export default MaterialPeriodical;
