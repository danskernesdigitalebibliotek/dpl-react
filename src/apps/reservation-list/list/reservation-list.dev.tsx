import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { withQuery } from "@storybook/addon-queryparams";
import ReservationList from "./reservation-list.entry";
import { getModalIds } from "../../../core/utils/helpers/general";
import serviceUrlArgs from "../../../core/storybook/serviceUrlArgs";

export default {
  title: "Apps / Reservation list",
  component: ReservationList,
  argTypes: {
    // Config
    ...serviceUrlArgs,
    blacklistedSearchBranchesConfig: {
      name: "Blacklisted branches",
      defaultValue: "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
      control: { type: "text" }
    },
    pageSizeDesktop: {
      name: "Number of search result items on desktop",
      defaultValue: 20,
      control: { type: "number" }
    },
    pageSizeMobile: {
      name: "Number of search result items on mobile",
      defaultValue: 10,
      control: { type: "number" }
    },
    ereolenMyPageUrl: {
      defaultValue: "https://ereolen.dk/user/me/",
      control: { type: "text" }
    },
    pauseReservationInfoUrl: {
      defaultValue:
        "https://images.unsplash.com/photo-1571043733612-d5444ff7d4ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80",
      control: { type: "text" }
    },
    pauseReservationStartDateConfig: {
      defaultValue: "2022-06-30",
      control: { type: "text" }
    },
    blacklistedPickupBranchesConfig: {
      name: "Blacklisted branches",
      defaultValue: "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
      control: { type: "text" }
    },
    branchesConfig: {
      name: "Branches",
      defaultValue:
        '[\n   {\n      "branchId":"DK-775120",\n      "title":"Højbjerg"\n   },\n   {\n      "branchId":"DK-775122",\n      "title":"Beder-Malling"\n   },\n   {\n      "branchId":"DK-775144",\n      "title":"Gellerup"\n   },\n   {\n      "branchId":"DK-775167",\n      "title":"Lystrup"\n   },\n   {\n      "branchId":"DK-775146",\n      "title":"Harlev"\n   },\n   {\n      "branchId":"DK-775168",\n      "title":"Skødstrup"\n   },\n   {\n      "branchId":"FBS-751010",\n      "title":"Arresten"\n   },\n   {\n      "branchId":"DK-775147",\n      "title":"Hasle"\n   },\n   {\n      "branchId":"FBS-751032",\n      "title":"Må ikke benyttes"\n   },\n   {\n      "branchId":"FBS-751031",\n      "title":"Fjernlager 1"\n   },\n   {\n      "branchId":"DK-775126",\n      "title":"Solbjerg"\n   },\n   {\n      "branchId":"FBS-751030",\n      "title":"ITK"\n   },\n   {\n      "branchId":"DK-775149",\n      "title":"Sabro"\n   },\n   {\n      "branchId":"DK-775127",\n      "title":"Tranbjerg"\n   },\n   {\n      "branchId":"DK-775160",\n      "title":"Risskov"\n   },\n   {\n      "branchId":"DK-775162",\n      "title":"Hjortshøj"\n   },\n   {\n      "branchId":"DK-775140",\n      "title":"Åby"\n   },\n   {\n      "branchId":"FBS-751009",\n      "title":"Fjernlager 2"\n   },\n   {\n      "branchId":"FBS-751029",\n      "title":"Stadsarkivet"\n   },\n   {\n      "branchId":"FBS-751027",\n      "title":"Intern"\n   },\n   {\n      "branchId":"FBS-751026",\n      "title":"Fælles undervejs"\n   },\n   {\n      "branchId":"FBS-751025",\n      "title":"Fællessekretariatet"\n   },\n   {\n      "branchId":"DK-775133",\n      "title":"Bavnehøj"\n   },\n   {\n      "branchId":"FBS-751024",\n      "title":"Fjernlånte materialer"\n   },\n   {\n      "branchId":"DK-775100",\n      "title":"Hovedbiblioteket"\n   },\n   {\n      "branchId":"DK-775170",\n      "title":"Trige"\n   },\n   {\n      "branchId":"DK-775150",\n      "title":"Tilst"\n   },\n   {\n      "branchId":"DK-775130",\n      "title":"Viby"\n   },\n   {\n      "branchId":"DK-775164",\n      "title":"Egå"\n   }\n]',
      control: { type: "text" }
    },
    // Texts
    reservationListHeaderText: {
      defaultValue: "Your reservations",
      control: { type: "text" }
    },
    reservationListPhysicalReservationsHeaderText: {
      defaultValue: "Physical reservations",
      control: { type: "text" }
    },
    reservationListDigitalReservationsHeaderText: {
      defaultValue: "Digital reservations",
      control: { type: "text" }
    },
    reservationListReadyForPickupTitleText: {
      defaultValue: "Ready for pickup",
      control: { type: "text" }
    },
    reservationListReadyForPickupEmptyText: {
      defaultValue: "At the moment you have 0 reservations ready for pickup",
      control: { type: "text" }
    },
    reservationListPhysicalReservationsEmptyText: {
      defaultValue: "At the moment you have 0 physical reservations",
      control: { type: "text" }
    },
    reservationListAllEmptyText: {
      defaultValue: "At the moment you have 0 reservations",
      control: { type: "text" }
    },
    reservationListDigitalReservationsEmptyText: {
      defaultValue: "At the moment you have 0 reservations on digital items",
      control: { type: "text" }
    },
    reservationListReadyText: {
      defaultValue: "Ready",
      control: { type: "text" }
    },
    materialByAuthorText: {
      defaultValue: "By",
      control: { type: "text" }
    },
    materialAndAuthorText: {
      defaultValue: "and",
      control: { type: "text" }
    },
    reservationListNumberInQueueText: {
      defaultValue: "There are @count people in the queue before you",
      control: { type: "text" }
    },
    reservationListFirstInQueueText: {
      defaultValue: "You are at the front of the queue",
      control: { type: "text" }
    },
    reservationListInQueueText: {
      defaultValue: "queued",
      control: { type: "text" }
    },
    reservationPickUpLatestText: {
      defaultValue: "Pick up before @date",
      control: { type: "text" }
    },
    publizonEbookText: {
      defaultValue: "E-book",
      control: { type: "text" }
    },
    publizonAudioBookText: {
      defaultValue: "Audiobook",
      control: { type: "text" }
    },
    publizonPodcastText: {
      defaultValue: "Podcast",
      control: { type: "text" }
    },
    reservationListLoanBeforeText: {
      defaultValue: "Borrow before @date",
      control: { type: "text" }
    },
    reservationListAvailableInText: {
      defaultValue: "Available in @count days",
      control: { type: "text" }
    },
    reservationListDaysText: {
      defaultValue: "days",
      control: { type: "text" }
    },
    reservationListDayText: {
      defaultValue: "day",
      control: { type: "text" }
    },
    reservationDetailsButtonRemoveText: {
      defaultValue: "Remove your reservation",
      control: { type: "text" }
    },
    reservationDetailsOthersInQueueText: {
      defaultValue: "Others are queueing for this material",
      control: { type: "text" }
    },
    reservationDetailsNumberInQueueLabelText: {
      defaultValue: "@count queued",
      control: { type: "text" }
    },
    reservationDetailsStatusTitleText: {
      defaultValue: "Status",
      control: { type: "text" }
    },
    reservationDetailsExpiresTitleText: {
      defaultValue: "Pickup deadline",
      control: { type: "text" }
    },
    reservationDetailsDigitalMaterialExpiresTitleText: {
      defaultValue: "Borrow before",
      control: { type: "text" }
    },
    reservationDetailsPickUpAtTitleText: {
      defaultValue: "Pickup branch",
      control: { type: "text" }
    },
    reservationDetailsChangeText: {
      defaultValue: "Apply changes",
      control: { type: "text" }
    },
    reservationDetailsPickupDeadlineTitleText: {
      defaultValue: "Pickup deadline",
      control: { type: "text" }
    },
    reservationDetailsDateOfReservationTitleText: {
      defaultValue: "Date of reservation",
      control: { type: "text" }
    },
    reservationDetailsNoInterestAfterTitleText: {
      defaultValue: "Not interested after",
      control: { type: "text" }
    },
    reservationDetailsReadyForLoanText: {
      defaultValue: "Ready for pickup",
      control: { type: "text" }
    },
    reservationDetailsRemoveDigitalReservationText: {
      defaultValue: "Remove your reservation",
      control: { type: "text" }
    },
    reservationDetailsDigitalReservationGoToEreolenText: {
      defaultValue: "Go to eReolen",
      control: { type: "text" }
    },
    reservationDetailsBorrowBeforeText: {
      defaultValue: "Borrow before @date",
      control: { type: "text" }
    },
    reservationDetailsExpiresText: {
      defaultValue: "Your reservation expires @date!",
      control: { type: "text" }
    },
    reservationDetailsSaveText: {
      defaultValue: "Save",
      control: { type: "text" }
    },
    reservationDetailsCancelText: {
      defaultValue: "Cancel",
      control: { type: "text" }
    },
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
    },
    reservationListPauseReservationText: {
      defaultValue: "Pause your reservations",
      control: { type: "text" }
    },
    reservationListOnHoldAriaText: {
      defaultValue:
        "Reservations have been paused in the following time span: ",
      control: { type: "text" }
    },
    reservationListPauseReservationAriaModalText: {
      defaultValue:
        "This button opens a modal that covers the entire page and contains the possibility to pause physical reservations",
      control: { type: "text" }
    },
    pauseReservationModalAriaDescriptionText: {
      defaultValue:
        "This modal makes it possible to pause your physical reservations",
      control: { type: "text" }
    },
    pauseReservationModalHeaderText: {
      defaultValue: "Pause reservations on physical items",
      control: { type: "text" }
    },
    pauseReservationModalBodyText: {
      defaultValue:
        "Pause your reservations early, since reservations that are already being processed, will not be paused.",
      control: { type: "text" }
    },
    pauseReservationModalCloseModalText: {
      defaultValue: "Close pause reservations modal",
      control: { type: "text" }
    },
    dateInputsStartDateLabelText: {
      defaultValue: "Start date",
      control: { type: "text" }
    },
    dateInputsEndDateLabelText: {
      defaultValue: "End date",
      control: { type: "text" }
    },
    pauseReservationModalBelowInputsTextText: {
      defaultValue: "",
      control: { type: "text" }
    },
    pauseReservationModalLinkText: {
      defaultValue:
        "Read more about pausing reservertions and what that means here",
      control: { type: "text" }
    },
    pauseReservationModalSaveButtonLabelText: {
      defaultValue: "Save",
      control: { type: "text" }
    },
    oneMonthText: {
      defaultValue: "1 month",
      control: { type: "text" }
    },
    twoMonthsText: {
      defaultValue: "2 months",
      control: { type: "text" }
    },
    threeMonthsText: {
      defaultValue: "3 months",
      control: { type: "text" }
    },
    sixMonthsText: {
      defaultValue: "6 months",
      control: { type: "text" }
    },
    oneYearText: {
      defaultValue: "1 year",
      control: { type: "text" }
    },
    listDetailsNothingSelectedLabelText: {
      defaultValue: "Pick",
      control: { type: "text" }
    },
    showMoreText: {
      name: "Show more Text",
      defaultValue: "show more",
      control: { type: "text" }
    },
    resultPagerStatusText: {
      name: "Result pager status text",
      defaultValue: "Showing @itemsShown out of @hitcount results",
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

const { reservationDetails } = getModalIds();
export const ReservationListDigitalDetailsModal = Template.bind({});
ReservationListDigitalDetailsModal.parameters = {
  query: {
    modal: `${reservationDetails}9788740047905`
  }
};

export const ReservationListPhysicalDetailsModal = Template.bind({});
ReservationListPhysicalDetailsModal.parameters = {
  query: {
    modal: `${reservationDetails}46985591`
  }
};

const { deleteReservation } = getModalIds();
export const ReservationListDeletePhysicalModal = Template.bind({});
ReservationListDeletePhysicalModal.parameters = {
  query: {
    modal: `46985591&${deleteReservation}46985591`
  }
};

export const ReservationListDeleteDigitalModal = Template.bind({});
ReservationListDeleteDigitalModal.parameters = {
  query: {
    modal: `9788740047905&${deleteReservation}9788740047905`
  }
};

const { pauseReservation } = getModalIds();
export const ReservationListPauseModal = Template.bind({});
ReservationListPauseModal.parameters = {
  query: {
    modal: pauseReservation
  }
};
