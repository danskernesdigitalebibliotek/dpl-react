import React from "react";
import { DateSelectArg } from "@fullcalendar/core";
import {
  adjustEndDateToStartDayGridMonth,
  adjustEndDateToStartDayTimeGridWeek,
  formatDateStr,
  formatFullCalendarEventToCmsEvent,
  updateDateTime
} from "./helper";
import EventForm, { EventFormOnSubmitType } from "./EventForm";
import { DplOpeningHoursListGET200Item } from "../../core/dpl-cms/model";
import { OpeningHoursCategoriesType } from "./types";

type DialogFormAddProps = {
  selectedEventInfo: DateSelectArg;
  handleEventAdd: (selectedEventInfo: DplOpeningHoursListGET200Item) => void;
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
    if (repeatedEndDate) {
      // eslint-disable-next-line no-alert
      alert("Repeated event is not supported yet");
      closeDialog();
      return;
    }
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
      startDate={selectedEventInfo.start}
      endDate={selectedEventInfo.end}
      onSubmit={handleSubmit}
      isRepeatedOpeningHour
    />
  );
};

export default DialogFormAdd;
