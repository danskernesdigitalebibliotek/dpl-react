import { HoldingsV3 } from "../../../core/fbs/model/holdingsV3";

export type GroupListItem = {
  displayText: string;
  itemNumber: string;
  volume: string;
  volumeNumber: string;
  volumeYear: string;
};

export const getFirstEditionFromYear = <T extends string>(
  year: T,
  groupList: { [key in T]: GroupListItem[] }
) => {
  return groupList[year][0];
};

// This makes a array of all periodical editions
export function makePeriodicalEditionsFromHoldings(holdings: HoldingsV3[]) {
  return holdings
    .map((holding: HoldingsV3) => {
      // Make all editions from holdings into one array
      return holding.materials.flat().map((material) => {
        // Return a object that contains editions + itemNumber
        return { ...material.periodical, itemNumber: material.itemNumber };
      });
    })
    .flat();
}

export default {};
