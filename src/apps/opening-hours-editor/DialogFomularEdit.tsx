import React from "react";
import { EventImpl } from "@fullcalendar/core/internal";
import { extractTime, updateEventTime } from "./helper";
import EventForm, { EventFormOnSubmitType } from "./EventForm";
import { useText } from "../../core/utils/text";

type DialogFomularEditProps = {
  eventInfo: EventImpl;
  handleEventEditing: (eventInfo: EventImpl) => void;
  closeDialog: () => void;
  handleEventRemove: (eventToRemove: EventImpl) => void;
};

const DialogFomularEdit: React.FC<DialogFomularEditProps> = ({
  eventInfo,
  handleEventEditing,
  closeDialog,
  handleEventRemove
}) => {
  const t = useText();
  const handleSubmit: EventFormOnSubmitType = (title, startTime, endTime) => {
    if (eventInfo.start && eventInfo.end) {
      eventInfo.setProp("title", title);
      const startDate = updateEventTime(eventInfo.start, startTime);

      const endDate = updateEventTime(eventInfo.end, endTime);
      eventInfo.setDates(startDate, endDate);

      handleEventEditing(eventInfo);
      closeDialog();
    }
  };

  if (!eventInfo.start || !eventInfo.end) {
    return null;
  }

  return (
    <>
      <EventForm
        initialTitle={eventInfo.title}
        initialStartTime={extractTime(eventInfo.start)}
        initialEndTime={extractTime(eventInfo.end)}
        onSubmit={handleSubmit}
      />
      <button
        className="opening-hours-remove-event-button"
        type="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleEventRemove(eventInfo);
            closeDialog();
          }
        }}
        onClick={() => {
          handleEventRemove(eventInfo);
          closeDialog();
        }}
      >
        {t("openingHoursRemoveEventButtonText")}
      </button>
    </>
  );
};

export default DialogFomularEdit;
