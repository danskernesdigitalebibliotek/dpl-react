import dayjs from "dayjs";
import { EventInput } from "@fullcalendar/core";
import { EventImpl } from "@fullcalendar/core/internal";
import {
  DplOpeningHoursListGET200Item,
  DplOpeningHoursCreatePOSTOpeningHoursInstanceBody,
  DplOpeningHoursUpdatePATCH200Item,
  DplOpeningHoursListGET200ItemRepetitionType
} from "../../core/dpl-cms/model";

const formatDateTimeString = (date: string, time: string): string => {
  return `${date}T${time}:00`;
};

export const formatCmsEventsToFullCalendar = (
  data: DplOpeningHoursListGET200Item[]
): EventInput[] => {
  return data.map(
    ({ category, date, start_time, end_time, id, repetition }) => {
      return {
        id: id.toString(),
        title: category.title,
        start: formatDateTimeString(date, start_time),
        end: formatDateTimeString(date, end_time),
        color: category.color,
        repetition
      };
    }
  );
};

export const formatFullCalendarEventToCmsEventAdd = (
  event: EventInput &
    Pick<DplOpeningHoursCreatePOSTOpeningHoursInstanceBody, "repetition">
): DplOpeningHoursCreatePOSTOpeningHoursInstanceBody => {
  if (!event.title || !event.color) {
    throw new Error("Invalid event format");
  }

  const startDate = dayjs(event.startStr);
  const endDate = dayjs(event.endStr);

  return {
    id: Number(event.id),
    category: {
      title: event.title,
      color: event.color
    },
    date: startDate.format("YYYY-MM-DD"),
    start_time: startDate.format("HH:mm"),
    end_time: endDate.format("HH:mm"),
    repetition: event.repetition,
    // set to id 0 to because the API requires a branch_id.
    // This will be overwritten when the event is added or edited in the useOpeningHoursEditor hook
    branch_id: 0
  };
};

export const formatFullCalendarEventToCmsEventEdit = (
  event: EventInput & Pick<DplOpeningHoursUpdatePATCH200Item, "repetition">
): DplOpeningHoursUpdatePATCH200Item => {
  if (!event.title || !event.backgroundColor) {
    throw new Error("Invalid event format");
  }

  const startDate = dayjs(event.startStr);
  const endDate = dayjs(event.endStr);

  return {
    id: Number(event.id),
    category: {
      title: event.title,
      color: event.backgroundColor
    },
    date: startDate.format("YYYY-MM-DD"),
    start_time: startDate.format("HH:mm"),
    end_time: endDate.format("HH:mm"),
    repetition: event.repetition,
    // set to id 0 to because the API requires a branch_id.
    // This will be overwritten when the event is added or edited in the useOpeningHoursEditor hook
    branch_id: 0
  };
};

export const formatDateStr = (date: Date) => {
  return dayjs(date).format("YYYY-MM-DDTHH:mm:ssZ");
};

export const adjustEndDateBasedOnStartDate = (startDay: Date, endDay: Date) => {
  const start = dayjs(startDay);
  const end = dayjs(endDay);

  // Check if the start and end dates are on the same day no adjustment is needed
  if (start.isSame(end, "day")) {
    return endDay;
  }

  // Adjust the end day to the same day as the start day but with the same time
  return start
    .hour(end.hour())
    .minute(end.minute())
    .second(end.second())
    .toDate();
};

export const adjustEndDateToStartDayTimeGridWeek = (
  startDay: Date,
  endDay: Date
) => {
  let adjustedEndDay;
  const start = dayjs(startDay);
  const end = dayjs(endDay);

  // If startDay and endDay are the same, no adjustment is needed
  if (start.isSame(end, "day")) {
    adjustedEndDay = end;
  } else {
    // If startDay and endDay are different, set adjustedEndDay to the next day at midnight
    adjustedEndDay = start.add(1, "day").startOf("day");
  }

  return {
    end: adjustedEndDay.toDate(),
    endStr: formatDateStr(adjustedEndDay.toDate())
  };
};

export const adjustEndDateToStartDayGridMonth = (
  startDay: Date,
  endDay: Date
) => {
  const adjustedEndDay = adjustEndDateBasedOnStartDate(startDay, endDay);

  return {
    end: adjustedEndDay,
    endStr: formatDateStr(adjustedEndDay)
  };
};

export const extractTime = (date: Date) => {
  return dayjs(date).format("HH:mm");
};

export const updateDateTime = (date: Date, timeStr: string): Date => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return dayjs(date).hour(hours).minute(minutes).toDate();
};

export const getWeekDayName = (date: Date) => {
  return dayjs(date).format("dddd");
};

export const getDateString = (date: Date) => {
  return dayjs(date).format("DD-MM-YYYY");
};

export const getStringForDateInput = (date: Date) => {
  return dayjs(date).format("YYYY-MM-DD");
};

export const isOpeningHourWeeklyRepetition = (
  event: EventImpl | EventInput
) => {
  if ("event" in event) {
    return (
      event.event.extendedProps?.repetition?.type ===
      DplOpeningHoursListGET200ItemRepetitionType.weekly
    );
  }
  return (
    event.extendedProps?.repetition?.type ===
    DplOpeningHoursListGET200ItemRepetitionType.weekly
  );
};

// This used for cypress testing in in cms where we test the complete flow of
// opening hours between the editor (Admin) and the calendar (Frontend)
export const getInitialDateFromUrl = (): Date | null => {
  const query = new URLSearchParams(window.location.search);
  const initialDateString = query.get("initialDate");

  if (!initialDateString) {
    return null;
  }

  const date = new Date(initialDateString);
  if (!Number.isNaN(date.getTime())) {
    return date;
  }

  console.debug(
    "Invalid date format in URL parameter: initialDate =",
    initialDateString
  );
  return null;
};
