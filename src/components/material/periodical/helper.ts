import { Periodical } from "../../../core/fbs/model";
import { HoldingsV3 } from "../../../core/fbs/model/holdingsV3";

export type PeriodicalEdition = {
  displayText: string;
  itemNumber: string;
  volume: string;
  volumeNumber: string;
  volumeYear: string;
};

export type GroupList = { [key: string]: PeriodicalEdition[] };

// This type is necessary to mimic structure of the return type for
// groupObjectArrayByProperty() where the keys are optionally undefined
// as opposed to PeriodicalEdition type defined above.
export interface PartialPeriodicalEdition
  extends Omit<Periodical, "displayText"> {
  itemNumber: string;
  displayText?: string;
}

export const getFirstEditionFromYear = <T extends string>(
  year: T,
  groupList: { [key in T]: string[] }
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

export function filterAndSortPeriodicalEditions(baseData: {
  [key: string]: PartialPeriodicalEdition[];
}) {
  const periodicalEditions = Object.entries(baseData);
  const filteredEditions = periodicalEditions.map((yearAndEditions) => {
    return yearAndEditions[1].reduce((acc, edition) => {
      if (!edition.volumeNumber) {
        return acc;
      }
      const includesValueAlready = acc.includes(edition.volumeNumber);
      if (!includesValueAlready) {
        acc.push(edition.volumeNumber);
      }
      return acc;
    }, [] as string[]);
  });
  const allYears = periodicalEditions.map(
    (yearEditionPair) => yearEditionPair[0]
  );
  const filteredPeriodicalEditionsObj = allYears.reduce((acc, curr, index) => {
    // Sort editions array
    // eslint-disable-next-line no-param-reassign
    acc[curr] = filteredEditions[index].sort((a, b) => {
      return a.localeCompare(b, "da-DK", { numeric: true });
    });
    return acc;
  }, {} as { [key: string]: string[] });
  return filteredPeriodicalEditionsObj;
}

export default {};
