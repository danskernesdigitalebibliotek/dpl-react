export const argTypes = {
  deleteReservationModalHeaderText: {
    control: { type: "text" }
  },
  deleteReservationModalDeleteQuestionText: {
    control: { type: "text" }
  },
  deleteReservationModalNotRegrettableText: {
    control: { type: "text" }
  },
  deleteReservationModalDeleteButtonText: {
    control: { type: "text" }
  },
  deleteReservationModalCloseModalText: {
    control: { type: "text" }
  },
  deleteReservationModalAriaDescriptionText: {
    control: { type: "text" }
  }
};

export default {
  deleteReservationModalHeaderText:
    '{"type":"plural","text":["Cancel reservation","Cancel reservations"]}',
  deleteReservationModalDeleteQuestionText:
    '{"type":"plural","text":["Do you want to cancel your reservation?","Do you want to cancel your reservations?"]}',
  deleteReservationModalNotRegrettableText: "You cannot regret this action",
  deleteReservationModalDeleteButtonText:
    '{"type":"plural","text":["Cancel reservation","Cancel reservations"]}',
  deleteReservationModalCloseModalText: "Close delete reservation modal",
  deleteReservationModalAriaDescriptionText:
    "This button opens a modal that covers the entire page and contains the possibility to delete a selected reservation, or multiple selected reservations"
};

export interface DeleteReservationModalArgs {
  deleteReservationModalHeaderText: string;
  deleteReservationModalDeleteQuestionText: string;
  deleteReservationModalNotRegrettableText: string;
  deleteReservationModalDeleteButtonText: string;
  deleteReservationModalCloseModalText: string;
  deleteReservationModalAriaDescriptionText: string;
}
