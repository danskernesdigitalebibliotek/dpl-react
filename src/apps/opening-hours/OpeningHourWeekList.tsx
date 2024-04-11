import dayjs from "dayjs";
import "dayjs/locale/da";
import React from "react";
import OpeningHoursDayEntry from "./OpeningHoursDayEntry";
import {
  GroupedOpeningHours,
  formatDateToWeekday
} from "./OpeningHoursHelpers";
import OpeningHourWeekListSkeleton from "./OpeningHourWeekListSkeleton";

interface OpeningHoursWeekListProps {
  data: GroupedOpeningHours;
  isLoading: boolean;
}

const OpeningHoursWeekList: React.FC<OpeningHoursWeekListProps> = ({
  data,
  isLoading
}) => {
  return isLoading ? (
    <OpeningHourWeekListSkeleton />
  ) : (
    <ul className="opening-hours__content" data-cy="opening-hours-week-list">
      {data.map(({ dateTime, openingHourEntries }) => {
        const dateAsWeekday = formatDateToWeekday(dateTime);
        const formattedDateForDisplay = dayjs(dateTime).format("DD/MM");

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
              <p>
                Biblioteket er <strong>lukket</strong> denne dag.
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default OpeningHoursWeekList;
