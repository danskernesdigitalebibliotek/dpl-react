import React from "react";
import { EventImpl } from "@fullcalendar/core/internal";
import {
  adjustEndDateBasedOnStartDate,
  extractTime,
  formatFullCalendarEventToCmsEvent,
  updateDateTime
} from "./helper";
import EventForm, { EventFormOnSubmitType } from "./EventForm";
import { useText } from "../../core/utils/text";
import { OpeningHoursCategoriesType } from "./types";
import { DplOpeningHoursListGET200Item } from "../../core/dpl-cms/model";

type DialogFormEditProps = {
  eventInfo: EventImpl;
  handleEventEditing: (event: DplOpeningHoursListGET200Item) => void;
  closeDialog: () => void;
  handleEventRemove: (eventId: string) => void;
  openingHoursCategories: OpeningHoursCategoriesType[];
};

const DialogFormEdit: React.FC<DialogFormEditProps> = ({
  eventInfo,
  handleEventEditing,
  closeDialog,
  handleEventRemove,
  openingHoursCategories
}) => {
  const t = useText();

  const handleSubmit: EventFormOnSubmitType = (
    category,
    startTime,
    endTime
  ) => {
    if (!eventInfo.start || !eventInfo.end) {
      // eslint-disable-next-line no-alert
      alert(t("openingHoursInvalidEventText"));
      return;
    }
    const startDate = updateDateTime(eventInfo.start, startTime);
    let endDate = updateDateTime(eventInfo.end, endTime);

    endDate = adjustEndDateBasedOnStartDate(startDate, endDate);

    eventInfo.setProp("title", category.title);
    eventInfo.setProp("color", category.color);
    eventInfo.setDates(startDate, endDate);

    handleEventEditing(formatFullCalendarEventToCmsEvent(eventInfo));
    closeDialog();
  };

  if (!eventInfo.start || !eventInfo.end) {
    // eslint-disable-next-line no-alert
    alert("Invalid event");
    return null;
  }

  return (
    <EventForm
      initialTitle={eventInfo.title}
      initialStartTime={extractTime(eventInfo.start)}
      initialEndTime={extractTime(eventInfo.end)}
      onSubmit={handleSubmit}
      openingHoursCategories={openingHoursCategories}
    >
      <button
        className="opening-hours-editor-form__remove"
        type="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            eventInfo.remove();
            handleEventRemove(eventInfo.id);
            closeDialog();
          }
        }}
        onClick={() => {
          eventInfo.remove();
          handleEventRemove(eventInfo.id);
          closeDialog();
        }}
      >
        {t("openingHoursRemoveEventButtonText")}
      </button>
    </EventForm>
  );
};

export default DialogFormEdit;
