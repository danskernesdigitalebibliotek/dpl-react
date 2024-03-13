import { DplOpeningHoursListGET200Item } from "../../core/dpl-cms/model";

const formatCmsEventsToFullCalendar = (
  data: DplOpeningHoursListGET200Item[]
) => {
  return data.map(({ category, date, start_time, end_time }) => ({
    title: category.title,
    start: `${date}T${start_time}:00`,
    end: `${date}T${end_time}:00`,
    allDay: false,
    color: "blue"
  }));
};

export default formatCmsEventsToFullCalendar;
