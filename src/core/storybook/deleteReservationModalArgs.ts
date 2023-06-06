export default {
  deleteReservationModalHeaderText: {
    defaultValue:
      '{"type":"plural","text":["Cancel reservation","Cancel reservations"]}',
    control: { type: "text" }
  },
  deleteReservationModalDeleteQuestionText: {
    defaultValue:
      '{"type":"plural","text":["Do you want to cancel your reservation?","Do you want to cancel your reservations?"]}',
    control: { type: "text" }
  },
  deleteReservationModalNotRegrettableText: {
    defaultValue: "You cannot regret this action",
    control: { type: "text" }
  },
  deleteReservationModalDeleteButtonText: {
    defaultValue:
      '{"type":"plural","text":["Cancel reservation","Cancel reservations"]}',
    control: { type: "text" }
  },
  deleteReservationModalCloseModalText: {
    defaultValue: "Close delete reservation modal",
    control: { type: "text" }
  },
  deleteReservationModalAriaDescriptionText: {
    defaultValue:
      "This button opens a modal that covers the entire page and contains the possibility to delete a selected reservation, or multiple selected reservations",
    control: { type: "text" }
  }
};

export interface DeleteReservationModalArgs {
  deleteReservationModalHeaderText: string;
  deleteReservationModalDeleteQuestionText: string;
  deleteReservationModalNotRegrettableText: string;
  deleteReservationModalDeleteButtonText: string;
  deleteReservationModalCloseModalText: string;
  deleteReservationModalAriaDescriptionText: string;
}
