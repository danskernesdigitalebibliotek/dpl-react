import * as React from "react";
import { FC, useState } from "react";
import ExpandMoreIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import { HoldingsForBibliographicalRecordV3 } from "../../core/fbs/model";
import {
  PeriodicalEdition,
  makePeriodicalEditionsFromHoldings
} from "../material/periodical/helper";
import { groupObjectArrayByProperty } from "../../core/utils/helpers/general";
import { useText } from "../../core/utils/text";

export interface FindOnShelfPeriodicalDropdownProps {
  manifestationsHoldings: HoldingsForBibliographicalRecordV3[];
  setSelectedPeriodical: (selectedPeriodical: PeriodicalEdition) => void;
  selectedPeriodical: PeriodicalEdition;
}

const FindOnShelfPeriodicalDropdown: FC<FindOnShelfPeriodicalDropdownProps> = ({
  manifestationsHoldings,
  setSelectedPeriodical,
  selectedPeriodical
}) => {
  const t = useText();
  const periodicalEditionsBase = makePeriodicalEditionsFromHoldings(
    manifestationsHoldings[0].holdings
  );

  // Removing duplicate values of editions
  const groupedPeriodicalEditionsBase = groupObjectArrayByProperty(
    periodicalEditionsBase,
    "volumeYear"
  );
  const periodicalEditions = Object.entries(groupedPeriodicalEditionsBase);
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
      return a.localeCompare(b, "da-DK");
    });
    return acc;
  }, {} as { [key: string]: string[] });

  const sortedPeriodicalYears = Object.keys(
    filteredPeriodicalEditionsObj
  ).sort();

  const [selectedYear, setSelectedYear] = useState<string>(
    selectedPeriodical.volumeYear
  );

  const toBeSelectedPeriodical = groupedPeriodicalEditionsBase[
    Number(selectedYear)
  ].find(
    (periodicalEdition) =>
      periodicalEdition.volumeNumber === selectedPeriodical.volumeNumber
  );

  return (
    <div className="modal-find-on-shelf__periodical-dropdowns">
      <div className="dropdown dropdown--grey-borders">
        <select
          className="dropdown__select"
          aria-label={t("findOnShelfModalPeriodicalYearDropdownText")}
          defaultValue={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {sortedPeriodicalYears.map((volumeYear) => (
            <option
              key={volumeYear}
              value={volumeYear}
              className="dropdown__option"
            >
              {volumeYear}
            </option>
          ))}
        </select>
        <div className="dropdown__arrows">
          <img className="dropdown__arrow" src={ExpandMoreIcon} alt="" />
        </div>
      </div>
      {selectedYear && (
        <div className="dropdown dropdown--grey-borders">
          <select
            className="dropdown__select"
            aria-label={t("findOnShelfModalPeriodicalEditionDropdownText")}
            defaultValue={selectedPeriodical.volumeNumber}
            onChange={(e) =>
              setSelectedPeriodical({
                volumeYear: selectedYear,
                volumeNumber: e.target.value || "",
                displayText: toBeSelectedPeriodical?.displayText || "",
                itemNumber: toBeSelectedPeriodical?.itemNumber || "",
                volume: toBeSelectedPeriodical?.volume || ""
              })
            }
          >
            {filteredPeriodicalEditionsObj[selectedYear].map(
              (periodicalEdition) => {
                return (
                  <option key={periodicalEdition} value={periodicalEdition}>
                    {periodicalEdition}
                  </option>
                );
              }
            )}
          </select>
          <div className="dropdown__arrows">
            <img className="dropdown__arrow" src={ExpandMoreIcon} alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default FindOnShelfPeriodicalDropdown;
