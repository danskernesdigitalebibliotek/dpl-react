import React from "react";
import { useText } from "../../core/utils/text";
import OpeningHourWeekListSkeleton from "./OpeningHourWeekListSkeleton";
import OpeningHoursDayEntry from "./OpeningHoursDayEntry";
import { GroupedOpeningHours } from "./OpeningHoursHelpers";
import {
  formatDateToWeekday,
  formatDayMonth
} from "../../core/utils/helpers/date";

interface OpeningHoursWeekListProps {
  data: GroupedOpeningHours;
  isLoading: boolean;
}

const OpeningHoursWeekList: React.FC<OpeningHoursWeekListProps> = ({
  data,
  isLoading
}) => {
  const t = useText();

  return isLoading ? (
    <OpeningHourWeekListSkeleton />
  ) : (
    <ul className="opening-hours__content" data-cy="opening-hours-week-list">
      {data.map(({ dateTime, openingHourEntries }) => {
        const dateAsWeekday = formatDateToWeekday(dateTime);
        const formattedDateForDisplay = formatDayMonth(dateTime);

        return (
          <li key={formattedDateForDisplay} className="opening-hours__row">
            <h3 className="opening-hours__individual-day">{`${dateAsWeekday}: d. ${formattedDateForDisplay}`}</h3>
            {openingHourEntries.length > 0 ? (
              <ul>
                {openingHourEntries.map((item, categoryIndex) => (
                  <OpeningHoursDayEntry
                    key={item.id}
                    data={item}
                    isOdd={categoryIndex % 2 === 0}
                  />
                ))}
              </ul>
            ) : (
              <p>{t("libraryIsClosedText")}</p>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default OpeningHoursWeekList;
