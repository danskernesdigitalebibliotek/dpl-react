export default {
  groupModalReservationsCloseModalAriaLabelText: {
    control: {
      type: "text"
    },
    defaultValue: "Close modal with grouped reservations"
  },
  groupModalReservationsLoansAriaDescriptionText: {
    control: {
      type: "text"
    },
    defaultValue: "This modal makes it possible to delete reservations"
  },
  readyForLoanCounterLabelText: {
    defaultValue: "Ready",
    control: { type: "text" }
  },
  removeAllReservationsText: {
    defaultValue: "Remove reservations (@amount)",
    control: { type: "text" }
  },
  pickUpLatestText: {
    defaultValue: "Pick up before @date",
    control: { type: "text" }
  },
  reservationsReadyForPickupText: {
    defaultValue: "Reservations ready for pickup",
    control: { type: "text" }
  }
};

export interface GroupModalReservationsProps {
  groupModalReservationsCloseModalAriaLabelText: string;
  groupModalReservationsLoansAriaDescriptionText: string;
  readyForLoanCounterLabelText: string;
  removeAllReservationsText: string;
  pickUpLatestText: string;
  reservationsReadyForPickupText: string;
}
