export const argTypes = {
  groupModalReservationsCloseModalAriaLabelText: {
    table: {
      defaultValue: { summary: "Close modal with grouped reservations" },
      type: { summary: "text" }
    },
    control: { type: "text" }
  },
  groupModalReservationsLoansAriaDescriptionText: {
    table: {
      defaultValue: {
        summary: "This modal makes it possible to delete reservations"
      },
      type: { summary: "text" }
    },
    control: { type: "text" }
  },
  readyForLoanCounterLabelText: {
    table: { defaultValue: { summary: "Ready" }, type: { summary: "text" } },
    control: { type: "text" }
  },
  removeAllReservationsText: {
    table: {
      defaultValue: {
        summary:
          '{"type":"plural","text":["Remove reservation (@amount)","Remove reservations (@amount)"]}'
      },
      type: { summary: "text" }
    },
    control: { type: "text" }
  },
  pickUpLatestText: {
    table: {
      defaultValue: { summary: "Pick up before @date" },
      type: { summary: "text" }
    },
    control: { type: "text" }
  },
  reservationsReadyForPickupText: {
    table: {
      defaultValue: { summary: "Reservations ready for pickup" },
      type: { summary: "text" }
    },
    control: { type: "text" }
  },
  physicalReservationsHeaderText: {
    table: {
      defaultValue: { summary: "Physical reservations" },
      type: { summary: "text" }
    },
    control: { type: "text" }
  },
  digitalReservationsHeaderText: {
    table: {
      defaultValue: { summary: "Digital reservations" },
      type: { summary: "text" }
    },
    control: { type: "text" }
  }
};

export default {
  groupModalReservationsCloseModalAriaLabelText:
    "Close modal with grouped reservations",
  groupModalReservationsLoansAriaDescriptionText:
    "This modal makes it possible to delete reservations",
  readyForLoanCounterLabelText: "Ready",
  removeAllReservationsText:
    '{"type":"plural","text":["Remove reservation (@amount)","Remove reservations (@amount)"]}',
  pickUpLatestText: "Pick up before @date",
  reservationsReadyForPickupText: "Reservations ready for pickup",
  physicalReservationsHeaderText: "Physical reservations",
  digitalReservationsHeaderText: "Digital reservations"
};

export interface GroupModalReservationsProps {
  groupModalReservationsCloseModalAriaLabelText: string;
  groupModalReservationsLoansAriaDescriptionText: string;
  readyForLoanCounterLabelText: string;
  removeAllReservationsText: string;
  pickUpLatestText: string;
  reservationsReadyForPickupText: string;
  physicalReservationsHeaderText: string;
  digitalReservationsHeaderText: string;
}
