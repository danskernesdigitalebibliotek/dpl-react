import React from "react";
import { EventImpl } from "@fullcalendar/core/internal";
import {
  adjustEndDateBasedOnStartDate,
  formatFullCalendarEventToCmsEventEdit,
  updateDateTime
} from "./helper";
import EventForm, { EventFormOnSubmitType } from "./EventForm";
import { useText } from "../../core/utils/text";
import { OpeningHoursCategoriesType } from "./types";
import { DplOpeningHoursUpdatePATCHBody } from "../../core/dpl-cms/model";

type DialogFormEditProps = {
  eventInfo: EventImpl;
  handleEventEditing: (event: DplOpeningHoursUpdatePATCHBody) => void;
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

    const cmsEvent = {
      id: eventInfo.id,
      category,
      title: eventInfo.title,
      backgroundColor: eventInfo.backgroundColor,
      startStr: eventInfo.startStr,
      endStr: eventInfo.endStr,
      repetition: eventInfo.extendedProps.repetition
    };

    handleEventEditing(formatFullCalendarEventToCmsEventEdit(cmsEvent));
    closeDialog();
  };

  if (!eventInfo.start || !eventInfo.end) {
    // eslint-disable-next-line no-alert
    alert(t("openingHoursInvalidEventText"));
    return null;
  }

  return (
    <EventForm
      initialTitle={eventInfo.title}
      startDate={eventInfo.start}
      endDate={eventInfo.end}
      onSubmit={handleSubmit}
      openingHoursCategories={openingHoursCategories}
    >
      <button
        data-cy="opening-hours-editor-form__remove"
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
