import * as React from "react";
import OpeningHoursDayEntry from "./OpeningHoursEntry";
import { DplOpeningHoursListGET200Item as OpeningHoursItemType } from "../../core/dpl-cms/model/dplOpeningHoursListGET200Item";

interface GroupedOpeningHours {
  [day: string]: {
    date: string;
    openingHours: OpeningHoursItemType[];
  };
}

interface OpeningHoursWeekListProps {
  data: GroupedOpeningHours;
}

const OpeningHoursWeekList: React.FC<OpeningHoursWeekListProps> = ({
  data
}) => {
  return (
    <div>
      {Object.entries(data).map(([day, { date, openingHours }]) => (
        <div key={day}>
          <h3>
            {day}: {date}
          </h3>
          <ul className="opening-hours__content">
            {openingHours.map((item, index) => (
              <OpeningHoursDayEntry
                key={item.id}
                data={item}
                isOdd={index % 2 === 0}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OpeningHoursWeekList;
