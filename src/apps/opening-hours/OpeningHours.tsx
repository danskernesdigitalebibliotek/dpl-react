import ArrowLeft from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ArrowLeft.svg";
import ArrowRight from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ArrowRight.svg";
import * as React from "react";
import { useText } from "../../core/utils/text";
import OpeningHoursWeekList from "./OpeningHourWeekList";
import {
  formatWeekString,
  getNextWeek,
  getPreviousWeek
} from "../../core/utils/helpers/date";
import useOpeningHours from "./useOpeningHours";

export type OpeningHoursProps = {
  branchId: number;
  initialDate: Date;
};

const OpeningHours: React.FC<OpeningHoursProps> = ({
  branchId,
  initialDate
}) => {
  const {
    currentWeekRange,
    groupedOpeningHours,
    navigateToPreviousWeek,
    navigateToNextWeek,
    isLoading
  } = useOpeningHours(initialDate, branchId);

  const t = useText();
  const nextWeekDate = getNextWeek(currentWeekRange.start);
  const previousWeekDate = getPreviousWeek(currentWeekRange.start);

  const nextWeekString = formatWeekString(
    t("showOpeningHoursForWeekText"),
    nextWeekDate
  );

  const previousWeekString = formatWeekString(
    t("showOpeningHoursForWeekText"),
    previousWeekDate
  );

  const currentWeekString = formatWeekString(
    t("weekText"),
    currentWeekRange.start
  );

  return (
    <div className="opening-hours">
      <div className="opening-hours__header">
        <h2 className="opening-hours__heading">
          {t("openingHoursHeadingText")}
        </h2>
        <div className="opening-hours__navigation-controls">
          <button
            data-cy="opening-hours-previous-week-button"
            className="opening-hours__navigation-control"
            aria-label={previousWeekString}
            onClick={navigateToPreviousWeek}
            type="button"
          >
            <img src={ArrowLeft} alt="" />
          </button>
          <div className="opening-hours__week-display">{currentWeekString}</div>
          <button
            data-cy="opening-hours-next-week-button"
            className="opening-hours__navigation-control opening-hours__navigation-control--next"
            aria-label={nextWeekString}
            onClick={navigateToNextWeek}
            type="button"
          >
            <img src={ArrowRight} alt="" />
          </button>
        </div>
      </div>
      <OpeningHoursWeekList data={groupedOpeningHours} isLoading={isLoading} />
    </div>
  );
};
export default OpeningHours;
