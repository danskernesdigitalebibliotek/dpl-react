import { mapValues, uniq } from "lodash";
import { HoldingsLogisticsV1, Periodical } from "../../../core/fbs/model";

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

export const getLatestEditionFromYear = <T extends string>(
  year: T,
  groupList: { [key in T]: string[] }
) => {
  return groupList[year][groupList[year].length - 1];
};

// This makes a array of all periodical editions
export function makePeriodicalEditionsFromHoldings(
  holdings: HoldingsLogisticsV1[]
) {
  return holdings
    .map((holding: HoldingsLogisticsV1) => {
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
  const yearVolumes = mapValues(baseData, (editions) => {
    return editions.map((edition) => edition.volumeNumber);
  });
  const yearVolumesSorted = mapValues(yearVolumes, (volumes) => {
    const volumesNoUndefined = volumes.filter((volume) => !!volume);
    return (volumesNoUndefined as string[]).sort((a, b) => {
      return a.localeCompare(b, "da-DK", { numeric: true });
    });
  });
  const yearVolumesSortedUnique = mapValues(yearVolumesSorted, (volumes) => {
    return uniq(volumes);
  });
  return yearVolumesSortedUnique;
}

export function handleSelectEdition(
  groupList: GroupList,
  year: string,
  editionToMatch: string,
  selectPeriodicalHandler: (selectedPeriodical: PeriodicalEdition) => void
) {
  const changedFullPeriodicalEdition = groupList[year].find((edition) => {
    return edition.volumeNumber === editionToMatch;
  });
  if (changedFullPeriodicalEdition) {
    selectPeriodicalHandler(changedFullPeriodicalEdition);
  }
}

export function handleSelectYear(
  year: string,
  setYear: (value: React.SetStateAction<string>) => void,
  selectPeriodicalHandler: (selectedPeriodical: PeriodicalEdition) => void,
  periodicalEditions: { [key: string]: string[] },
  groupList: GroupList
) {
  setYear(year);
  // Updates the selectedPeriodical to the first edition of the selected year.
  const changedEdition = getLatestEditionFromYear(year, periodicalEditions);
  handleSelectEdition(groupList, year, changedEdition, selectPeriodicalHandler);
}

export default {};
