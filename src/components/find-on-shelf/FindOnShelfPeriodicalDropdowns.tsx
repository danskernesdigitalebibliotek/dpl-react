import * as React from "react";
import { FC, useState } from "react";
import ExpandMoreIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import { HoldingsForBibliographicalRecordV3 } from "../../core/fbs/model";
import makePeriodicalEditionsFromHoldings from "../material/helper";
import { groupObjectArrayByProperty } from "../../core/utils/helpers/general";

export interface FindOnShelfPeriodicalDropdownProps {
  manifestationsHoldings: HoldingsForBibliographicalRecordV3[];
  setSelectedPeriodical: (selectedWeek: string | null) => void;
}

const FindOnShelfPeriodicalDropdown: FC<FindOnShelfPeriodicalDropdownProps> = ({
  manifestationsHoldings,
  setSelectedPeriodical
}) => {
  const periodicalEditionsArray = makePeriodicalEditionsFromHoldings(
    manifestationsHoldings[0].holdings
  );
  const sortedperiodicalEditionsArray = groupObjectArrayByProperty(
    periodicalEditionsArray,
    "volumeYear"
  );

  const [selectedYear, setSelectedYear] = useState<string>(
    String(Object.keys(sortedperiodicalEditionsArray).sort().pop())
  );

  return (
    <div className="periodical-dropdowns">
      <div className="dropdown dropdown--grey-borders">
        <select
          id="find-on-shelf-periodical-year"
          className="dropdown__select"
          aria-label="Choose periodical year"
          defaultValue={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {Object.keys(sortedperiodicalEditionsArray)
            .sort()
            .map((item) => (
              <option key={item} value={item} className="dropdown__option">
                {item}
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
            id="find-on-shelf-periodical-edition"
            className="dropdown__select"
            aria-label="Choose periodical week"
            onChange={(e) => setSelectedPeriodical(e.target.value)}
          >
            {sortedperiodicalEditionsArray[selectedYear].map(
              (periodicalEdition) => {
                return (
                  <option
                    key={periodicalEdition.itemNumber}
                    value={periodicalEdition.itemNumber}
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
