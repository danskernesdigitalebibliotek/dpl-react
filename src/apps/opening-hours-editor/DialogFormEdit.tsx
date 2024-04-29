import React from "react";
import { EventImpl } from "@fullcalendar/core/internal";
import {
  adjustEndDateBasedOnStartDate,
  formatFullCalendarEventToCmsEventEdit,
  isOpeningHourWeeklyRepetition,
  updateDateTime
} from "./helper";
import EventForm, { EventFormOnSubmitType } from "./EventForm";
import { useText } from "../../core/utils/text";
import { HandleEventRemoveType, OpeningHoursCategoriesType } from "./types";
import { DplOpeningHoursUpdatePATCHBody } from "../../core/dpl-cms/model";
import useDialog from "../../components/dialog/useDialog";
import Dialog from "../../components/dialog/Dialog";
import ConfirmEditRepeatedOpeningHour from "./ConfirmEditRepeatedOpeningHour";

type DialogFormEditProps = {
  eventInfo: EventImpl;
  handleEventEditing: (event: DplOpeningHoursUpdatePATCHBody) => void;
  closeDialog: () => void;
  handleEventRemove: ({
    eventId,
    repetition_id
  }: HandleEventRemoveType) => void;
  openingHoursCategories: OpeningHoursCategoriesType[];
};

const DialogFormEdit: React.FC<DialogFormEditProps> = ({
  eventInfo,
  handleEventEditing,
  closeDialog: closeEditDialog,
  handleEventRemove,
  openingHoursCategories
}) => {
  const t = useText();
  const { dialogContent, openDialogWithContent, closeDialog, dialogRef } =
    useDialog();

  const handleSubmit = ({
    category,
    startTime,
    endTime
  }: EventFormOnSubmitType) => {
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
    closeEditDialog();
  };

  if (!eventInfo.start || !eventInfo.end) {
    // eslint-disable-next-line no-alert
    alert(t("openingHoursInvalidEventText"));
    return null;
  }

  const handleEventRemoveConfirm = (editSerie: boolean) => {
    handleEventRemove({
      eventId: eventInfo.id,
      ...(editSerie
        ? { repetition_id: eventInfo.extendedProps.repetition.id }
        : {})
    });
    eventInfo.remove();
    closeDialog();
    closeEditDialog();
  };

  const handleRemoveButtonClick = () => {
    if (isOpeningHourWeeklyRepetition(eventInfo)) {
      openDialogWithContent(
        <ConfirmEditRepeatedOpeningHour
          title={t("openingHoursRemoveEventTitleText")}
          confirmSubmit={handleEventRemoveConfirm}
          closeDialog={closeDialog}
        />
      );
    } else {
      handleEventRemoveConfirm(false);
    }
  };

  return (
    <>
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
          onClick={handleRemoveButtonClick}
        >
          {t("openingHoursRemoveEventButtonText")}
        </button>
      </EventForm>

      <Dialog closeDialog={closeDialog} ref={dialogRef}>
        {dialogContent}
      </Dialog>
    </>
  );
};

export default DialogFormEdit;
