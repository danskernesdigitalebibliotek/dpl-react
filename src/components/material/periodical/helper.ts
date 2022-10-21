import { mapValues, uniq } from "lodash";
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

export function handleSelectYear(
  event: React.ChangeEvent<HTMLSelectElement>,
  setYear: (value: React.SetStateAction<string>) => void,
  selectPeriodicalHandler: (selectedPeriodical: PeriodicalEdition) => void,
  periodicalEditions: { [key: string]: string[] },
  groupList: GroupList
) {
  setYear(event.target.value);
  // Updates the selectedPeriodical to the first edition of the selected year.
  const changedEdition = getFirstEditionFromYear(
    event.target.value,
    periodicalEditions
  );
  const changedFullPeriodicalEdition = groupList[event.target.value].find(
    (edition) => {
      return edition.volumeNumber === changedEdition;
    }
  );
  if (changedFullPeriodicalEdition) {
    selectPeriodicalHandler(changedFullPeriodicalEdition);
  }
}

export function handleSelectEdition(
  event: React.ChangeEvent<HTMLSelectElement>,
  groupList: GroupList,
  year: string,
  selectPeriodicalHandler: (selectedPeriodical: PeriodicalEdition) => void
) {
  const changedFullPeriodicalEdition = groupList[year].find((edition) => {
    return edition.volumeNumber === event.target.value;
  });
  if (changedFullPeriodicalEdition) {
    selectPeriodicalHandler(changedFullPeriodicalEdition);
  }
}

export default {};
