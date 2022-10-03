import * as React from "react";
import { FC, useState } from "react";
import ExpandMoreIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import { HoldingsForBibliographicalRecordV3 } from "../../core/fbs/model";
import makePeriodicalEditionsFromHoldings from "../material/helper";
import { groupObjectArrayByProperty } from "../../core/utils/helpers/general";
import { SelectedPeriodicalEdition } from "./types";
import { useText } from "../../core/utils/text";

export interface FindOnShelfPeriodicalDropdownProps {
  manifestationsHoldings: HoldingsForBibliographicalRecordV3[];
  setSelectedPeriodical: (
    selectedPeriodicalEdition: SelectedPeriodicalEdition
  ) => void;
}

const FindOnShelfPeriodicalDropdown: FC<FindOnShelfPeriodicalDropdownProps> = ({
  manifestationsHoldings,
  setSelectedPeriodical
}) => {
  const t = useText();
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
    <div className="modal-find-on-shelf__periodical-dropdowns">
      <div className="dropdown dropdown--grey-borders">
        <select
          className="dropdown__select"
          aria-label={t("findOnShelfModalPeriodicalYearDropdownText")}
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
            className="dropdown__select"
            aria-label={t("findOnShelfModalPeriodicalEditionDropdownText")}
            onChange={(e) =>
              setSelectedPeriodical({
                selectedYear,
                selectedEdition: e.target.value
              })
            }
          >
            {sortedperiodicalEditionsArray[selectedYear].map(
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
