import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { withQuery } from "@storybook/addon-queryparams";
import ReservationList from "./reservation-list.entry";
import { configTypes } from "../../../core/utils/helpers/fetcher";
import { getModalIds } from "../../../core/utils/helpers/general";

export default {
  title: "Apps / Reservation list",
  component: ReservationList,
  argTypes: {
    [configTypes.fbs]: {
      defaultValue: "",
      control: { type: "text" }
    },
    [configTypes.publizon]: {
      defaultValue: "",
      control: { type: "text" }
    },
    headerText: {
      defaultValue: "Dine reserveringer",
      control: { type: "text" }
    },
    reservationListPhysicalReservationsHeaderText: {
      defaultValue: "Fysiske",
      control: { type: "text" }
    },
    reservationListDigitalReservationsHeaderText: {
      defaultValue: "Digitale",
      control: { type: "text" }
    },
    reservationListReadyForPickupTitleText: {
      defaultValue: "Klar til lån",
      control: { type: "text" }
    },
    readyText: {
      defaultValue: "Klar",
      control: { type: "text" }
    },
    materialByAuthorText: {
      defaultValue: "Af",
      control: { type: "text" }
    },
    materialAndAuthorText: {
      defaultValue: "og",
      control: { type: "text" }
    },
    youAreNumberInLineText: {
      defaultValue: "Du er nummer {tal her} i køen",
      control: { type: "text" }
    },
    expiresSoonText: {
      defaultValue: "Udløber snart",
      control: { type: "text" }
    },
    inLineText: {
      defaultValue: "I køen",
      control: { type: "text" }
    },
    reservationPickUpLatestText: {
      defaultValue: "Hent senest",
      control: { type: "text" }
    },
    publizonEbookText: {
      defaultValue: "E-bog",
      control: { type: "text" }
    },
    publizonAudioBookText: {
      defaultValue: "Lydbog",
      control: { type: "text" }
    },
    publizonPodcastText: {
      defaultValue: "Podcast",
      control: { type: "text" }
    },
    loanBeforeText: {
      defaultValue: "Lånes inden",
      control: { type: "text" }
    },
    daysText: {
      defaultValue: "Dage",
      control: { type: "text" }
    },
    canBeLoanedInText: {
      defaultValue: "Kan lånes om dage",
      control: { type: "text" }
    },
    reservationDetailsButtonText: {
      defaultValue: "Fjern din reservering",
      control: { type: "text" }
    },
    reservationDetailsOthersInQueueText: {
      defaultValue: "Andre står i kø til materialet",
      control: { type: "text" }
    },
    reservationDetailsNumberInQueueLabelText: {
      defaultValue: "i køen",
      control: { type: "text" }
    },
    reservationDetailsNumberInQueueTitelText: {
      defaultValue: "Status",
      control: { type: "text" }
    },
    reservationDetailsExpiresTitelText: {
      defaultValue: "Status",
      control: { type: "text" }
    },
    reservationDetailsPickUpAtTitelText: {
      defaultValue: "Afhentes på",
      control: { type: "text" }
    },
    reservationDetailsListDetailsChangeText: {
      defaultValue: "Skift",
      control: { type: "text" }
    },
    reservationDetailsPickupDeadlineTitelText: {
      defaultValue: "Udløbsdato",
      control: { type: "text" }
    },
    reservationDetailsExpiresLabelText: {
      defaultValue: "Reserveringen udløber",
      control: { type: "text" }
    },
    reservationDetailsDateOfReservationTitelText: {
      defaultValue: "Reserveringsdato",
      control: { type: "text" }
    },
    reservationDetailsNoInterestAfterTitelText: {
      defaultValue: "Har ingen interesse efter",
      control: { type: "text" }
    },
    reservationDetailsReadyForLoanText: {
      defaultValue: "Klar til lån",
      control: { type: "text" }
    },
    reservationDetailsRemoveReservationText: {
      defaultValue: "Fjern din reservering",
      control: { type: "text" }
    },
    reservationDetailsGoToEreolenText: {
      defaultValue: "Gå til ereolen",
      control: { type: "text" }
    },
    reservationDetailsLoanBeforeText: {
      defaultValue: "Lånes inden",
      control: { type: "text" }
    },
    reservationDetailsSaveText: {
      defaultValue: "Gem",
      control: { type: "text" }
    },
    reservationDetailsCancelText: {
      defaultValue: "Annuller",
      control: { type: "text" }
    },
    deleteReservationModalHeaderText: {
      defaultValue: "Slet reservering",
      control: { type: "text" }
    },
    deleteReservationModalDeleteQuestionText: {
      defaultValue: "Vil du slette din reservering?",
      control: { type: "text" }
    },
    deleteReservationModalNotRegrettableText: {
      defaultValue: "Handlingen kan ikke fortrydes",
      control: { type: "text" }
    },
    deleteReservationModalDeleteText: {
      defaultValue: "Slet",
      control: { type: "text" }
    },
    deleteReservationModalCloseModalText: {
      defaultValue: "Luk forny lån modal",
      control: { type: "text" }
    },
    deleteReservationModalAriaDescriptionText: {
      defaultValue:
        "Denne knap åbner en modal der dækker hele vinduet og der giver dig mulighed for at slette reservationen",
      control: { type: "text" }
    }
  },
  decorators: [withQuery]
} as ComponentMeta<typeof ReservationList>;

const Template: ComponentStory<typeof ReservationList> = (props) => (
  <ReservationList {...props} />
);

export const ReservationListEntry = Template.bind({});
ReservationListEntry.args = {};

export const ReservationListDigitalDetailsModal = Template.bind({});
ReservationListDigitalDetailsModal.parameters = {
  query: {
    modal: 9788740047905
  }
};

export const ReservationListPhysicalDetailsModal = Template.bind({});
ReservationListPhysicalDetailsModal.parameters = {
  query: {
    modal: "46985591"
  }
};

const { deleteReservation } = getModalIds();
export const ReservationListDeletePhysicalModal = Template.bind({});
ReservationListDeletePhysicalModal.parameters = {
  query: {
    modal: `46985591&${deleteReservation}67804976`
  }
};

export const ReservationListDeleteDigitalModal = Template.bind({});
ReservationListDeleteDigitalModal.parameters = {
  query: {
    modal: `9788740047905&${deleteReservation}9788740047905`
  }
};
