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
  const periodicalEditions = makePeriodicalEditionsFromHoldings(
    manifestationsHoldings[0].holdings
  );
  const groupedPeriodicalEditions = groupObjectArrayByProperty(
    periodicalEditions,
    "volumeYear"
  );
  const sortedPeriodicalEditions = Object.keys(
    groupedPeriodicalEditions
  ).sort();
  const [selectedYear, setSelectedYear] = useState<string>(
    selectedPeriodical.volumeYear
  );
  const toBeSelectedPeriodical = groupedPeriodicalEditions[
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
          {sortedPeriodicalEditions.map((volumeYear) => (
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
                volumeYear: toBeSelectedPeriodical?.volumeYear || "",
                volumeNumber: toBeSelectedPeriodical?.volumeNumber || "",
                displayText: toBeSelectedPeriodical?.displayText || "",
                itemNumber: toBeSelectedPeriodical?.itemNumber || "",
                volume: toBeSelectedPeriodical?.volume || ""
              })
            }
          >
            {groupedPeriodicalEditions[selectedYear].map(
              (periodicalEdition) => {
                return (
                  <option
                    key={periodicalEdition.itemNumber}
                    value={periodicalEdition.volumeNumber}
                  >
                    {periodicalEdition.volumeNumber}
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
