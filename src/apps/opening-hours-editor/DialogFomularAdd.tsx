import React from "react";
import { DateSelectArg } from "@fullcalendar/core";
import {
  adjustEndDateToStartDayGridMonth,
  adjustEndDateToStartDayTimeGridWeek,
  extractTime,
  formatDateStr,
  formatFullCalendarEventToCmsEvent,
  updateDateTime
} from "./helper";
import EventForm, { EventFormOnSubmitType } from "./EventForm";
import { DplOpeningHoursListGET200Item } from "../../core/dpl-cms/model";
import { OpeningHoursCategoriesType } from "./types";

type DialogFomularAddProps = {
  selectedEventInfo: DateSelectArg;
  handleEventAdd: (selectedEventInfo: DplOpeningHoursListGET200Item) => void;
  closeDialog: () => void;
  openingHoursCategories: OpeningHoursCategoriesType[];
};

const DialogFomularAdd: React.FC<DialogFomularAddProps> = ({
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
    endTime
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

    const newEventInfo = {
      ...selectedEventInfo,
      start,
      startStr,
      end,
      endStr,
      title: category.title,
      color: category.color,
      allDay: false
    };

    calendarApi.addEvent(newEventInfo);
    calendarApi.unselect();
    handleEventAdd(formatFullCalendarEventToCmsEvent(newEventInfo));
    closeDialog();
  };

  return (
    <EventForm
      openingHoursCategories={openingHoursCategories}
      initialStartTime={extractTime(selectedEventInfo.start)}
      initialEndTime={extractTime(selectedEventInfo.end)}
      onSubmit={handleSubmit}
    />
  );
};

export default DialogFomularAdd;
