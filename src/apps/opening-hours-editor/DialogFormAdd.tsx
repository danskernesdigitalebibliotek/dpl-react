import React from "react";
import { DateSelectArg } from "@fullcalendar/core";
import {
  adjustEndDateToStartDayGridMonth,
  adjustEndDateToStartDayTimeGridWeek,
  formatDateStr,
  formatFullCalendarEventToCmsEventAdd,
  updateDateTime
} from "./helper";
import EventForm, { EventFormOnSubmitType } from "./EventForm";
import {
  DplOpeningHoursCreatePOSTBody,
  DplOpeningHoursCreatePOSTBodyRepetitionType
} from "../../core/dpl-cms/model";
import { OpeningHoursCategoriesType } from "./types";

type DialogFormAddProps = {
  selectedEventInfo: DateSelectArg;
  handleEventAdd: (event: DplOpeningHoursCreatePOSTBody) => void;
  closeDialog: () => void;
  openingHoursCategories: OpeningHoursCategoriesType[];
};

const DialogFormAdd: React.FC<DialogFormAddProps> = ({
  selectedEventInfo,
  handleEventAdd,
  closeDialog,
  openingHoursCategories
}) => {
  const calendarApi = selectedEventInfo.view.calendar;
  const isDayGridMonth = selectedEventInfo.view.type === "dayGridMonth";
  const isTimeGridWeek = selectedEventInfo.view.type === "timeGridWeek";

  const handleSubmit: EventFormOnSubmitType = (
    category,
    startTime,
    endTime,
    repeatedEndDate
  ) => {
    const start = updateDateTime(selectedEventInfo.start, startTime);
    const startStr = formatDateStr(start);
    let end = updateDateTime(selectedEventInfo.end, endTime);
    let { endStr } = selectedEventInfo;

    if (isTimeGridWeek) {
      const adjustedEnd = adjustEndDateToStartDayTimeGridWeek(start, end);
      end = adjustedEnd.end;
      endStr = adjustedEnd.endStr;
    }

    if (isDayGridMonth) {
      const adjustedEnd = adjustEndDateToStartDayGridMonth(start, end);
      end = adjustedEnd.end;
      endStr = adjustedEnd.endStr;
    }

    const newFullCalenderEvent = {
      ...selectedEventInfo,
      start,
      startStr,
      end,
      endStr,
      title: category.title,
      color: category.color,
      allDay: false
    };

    calendarApi.addEvent(newFullCalenderEvent);
    calendarApi.unselect();

    const cmsEvent = formatFullCalendarEventToCmsEventAdd({
      ...newFullCalenderEvent,
      repetition: {
        type: repeatedEndDate
          ? DplOpeningHoursCreatePOSTBodyRepetitionType.weekly
          : DplOpeningHoursCreatePOSTBodyRepetitionType.none,
        ...(repeatedEndDate
          ? { weekly_data: { end_date: repeatedEndDate } }
          : {})
      }
    });

    handleEventAdd(cmsEvent);
    closeDialog();
  };

  return (
    <EventForm
      openingHoursCategories={openingHoursCategories}
      startDate={selectedEventInfo.start}
      endDate={selectedEventInfo.end}
      onSubmit={handleSubmit}
      isRepeatedOpeningHour
    />
  );
};

export default DialogFormAdd;
