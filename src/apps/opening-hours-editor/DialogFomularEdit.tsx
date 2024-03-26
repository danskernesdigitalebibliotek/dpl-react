import React from "react";
import { EventImpl } from "@fullcalendar/core/internal";
import { extractTime, updateEventTime } from "./helper";
import EventForm, { EventFormOnSubmitType } from "./EventForm";
import { useText } from "../../core/utils/text";
import { OpeningHoursCategoriesType } from "./types";

type DialogFomularEditProps = {
  eventInfo: EventImpl;
  handleEventEditing: (eventInfo: EventImpl) => void;
  closeDialog: () => void;
  handleEventRemove: (eventId: string) => void;
  openingHoursCategories: OpeningHoursCategoriesType[];
};

const DialogFomularEdit: React.FC<DialogFomularEditProps> = ({
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
      alert("Invalid event");
      return;
    }
    const startDate = updateEventTime(eventInfo.start, startTime);
    const endDate = updateEventTime(eventInfo.end, endTime);

    eventInfo.setProp("title", category.title);
    eventInfo.setProp("color", category.color);
    eventInfo.setDates(startDate, endDate);

    handleEventEditing(eventInfo);
    closeDialog();
  };

  if (!eventInfo.start || !eventInfo.end) {
    // eslint-disable-next-line no-alert
    alert("Invalid event");
    return null;
  }

  return (
    <>
      <EventForm
        initialTitle={eventInfo.title}
        initialStartTime={extractTime(eventInfo.start)}
        initialEndTime={extractTime(eventInfo.end)}
        onSubmit={handleSubmit}
        openingHoursCategories={openingHoursCategories}
      />
      <button
        className="opening-hours-remove-event-button"
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
    </>
  );
};

export default DialogFomularEdit;
