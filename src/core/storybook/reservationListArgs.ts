export const argTypes = {
  blacklistedSearchBranchesConfig: {
    description: "Blacklisted branches",
    control: { type: "text" }
  },
  expirationWarningDaysBeforeConfig: {
    control: { type: "text" }
  },
  pauseReservationStartDateConfig: {
    control: { type: "text" }
  },
  blacklistedPickupBranchesConfig: {
    description: "Blacklisted branches",
    control: { type: "text" }
  },
  branchesConfig: {
    description: "Branches",
    control: { type: "text" }
  },
  // Page size
  pageSizeDesktop: {
    control: { type: "number" }
  },
  pageSizeMobile: {
    control: { type: "number" }
  },
  // Urls
  ereolenMyPageUrl: {
    control: { type: "text" }
  },
  pauseReservationInfoUrl: {
    control: { type: "text" }
  },
  // Texts
  reservationListHeaderText: {
    control: { type: "text" }
  },
  reservationListPhysicalReservationsHeaderText: {
    control: { type: "text" }
  },
  reservationListDigitalReservationsHeaderText: {
    control: { type: "text" }
  },
  reservationListReadyForPickupTitleText: {
    control: { type: "text" }
  },
  reservationListReadyForPickupEmptyText: {
    control: { type: "text" }
  },
  reservationListPhysicalReservationsEmptyText: {
    control: { type: "text" }
  },
  reservationListAllEmptyText: {
    control: { type: "text" }
  },
  reservationListDigitalReservationsEmptyText: {
    control: { type: "text" }
  },
  reservationListReadyText: {
    control: { type: "text" }
  },
  materialByAuthorText: {
    control: { type: "text" }
  },
  materialAndAuthorText: {
    control: { type: "text" }
  },
  etAlText: {
    control: { type: "text" }
  },
  reservationListNumberInQueueText: {
    control: { type: "text" }
  },
  reservationListFirstInQueueText: {
    control: { type: "text" }
  },
  reservationListInQueueText: {
    control: { type: "text" }
  },
  reservationPickUpLatestText: {
    control: { type: "text" }
  },
  publizonEbookText: {
    control: { type: "text" }
  },
  publizonAudioBookText: {
    control: { type: "text" }
  },
  publizonPodcastText: {
    control: { type: "text" }
  },
  reservationListLoanBeforeText: {
    control: { type: "text" }
  },
  reservationListYouAreInQueueText: {
    control: { type: "text" }
  },
  reservationListAvailableInText: {
    control: { type: "text" }
  },
  reservationListDaysText: {
    control: { type: "text" }
  },
  reservationListDayText: {
    control: { type: "text" }
  },
  reservationDetailsExpiresTitleText: {
    control: { type: "text" }
  },
  reservationDetailsDigitalMaterialExpiresTitleText: {
    control: { type: "text" }
  },
  reservationDetailsExpiresText: {
    control: { type: "text" }
  },
  reservationDetailsSaveText: {
    control: { type: "text" }
  },
  reservationDetailsCancelText: {
    control: { type: "text" }
  },
  reservationListPauseReservationText: {
    control: { type: "text" }
  },
  reservationListPauseReservationOnHoldText: {
    control: { type: "text" }
  },
  reservationListOnHoldAriaText: {
    control: { type: "text" }
  },
  reservationListPauseReservationAriaModalText: {
    control: { type: "text" }
  },
  reservationListPauseReservationButtonText: {
    control: { type: "text" }
  },
  pauseReservationModalHeaderText: {
    control: { type: "text" }
  },
  pauseReservationModalBodyText: {
    control: { type: "text" }
  },
  pauseReservationModalDateRangeLabelText: {
    control: { type: "text" }
  },
  pauseReservationModalDateRangePlaceholderText: {
    control: { type: "text" }
  },
  pauseReservationModalCloseModalText: {
    control: { type: "text" }
  },
  pauseReservationModalLinkText: {
    control: { type: "text" }
  },
  pauseReservationModalSaveButtonLabelText: {
    control: { type: "text" }
  },
  pauseReservationModalCancelButtonLabelText: {
    control: { type: "text" }
  },
  listDetailsNothingSelectedLabelText: {
    control: { type: "text" }
  },
  showMoreText: {
    description: "Show more Text",
    control: { type: "text" }
  },
  resultPagerStatusText: {
    description: "Result pager status text",
    control: { type: "text" }
  },
  deleteReservationModalSuccessTitleText: {
    description: "Delete reservation modal success title text",
    control: { type: "text" }
  },
  deleteReservationModalSuccessStatusText: {
    description: "Delete reservation modal success status text",
    control: { type: "text" }
  },
  deleteReservationModalErrorsTitleText: {
    description: "Delete reservation modal errors title text",
    control: { type: "text" }
  },
  deleteReservationModalErrorsStatusText: {
    description: "Delete reservation modal errors status text",
    control: { type: "text" }
  },
  deleteReservationModalDeleteProcessingText: {
    description: "Delete reservation modal delete processing text",
    control: { type: "text" }
  }
};

export default {
  blacklistedSearchBranchesConfig:
    "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
  expirationWarningDaysBeforeConfig: "6",
  pauseReservationStartDateConfig: "2022-06-30",
  blacklistedPickupBranchesConfig:
    "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
  branchesConfig:
    '[\n   {\n      "branchId":"DK-775120",\n      "title":"Højbjerg"\n   },\n   {\n      "branchId":"DK-775122",\n      "title":"Beder-Malling"\n   },\n   {\n      "branchId":"DK-775144",\n      "title":"Gellerup"\n   },\n   {\n      "branchId":"DK-775167",\n      "title":"Lystrup"\n   },\n   {\n      "branchId":"DK-775146",\n      "title":"Harlev"\n   },\n   {\n      "branchId":"DK-775168",\n      "title":"Skødstrup"\n   },\n   {\n      "branchId":"FBS-751010",\n      "title":"Arresten"\n   },\n   {\n      "branchId":"DK-775147",\n      "title":"Hasle"\n   },\n   {\n      "branchId":"FBS-751032",\n      "title":"Må ikke benyttes"\n   },\n   {\n      "branchId":"FBS-751031",\n      "title":"Fjernlager 1"\n   },\n   {\n      "branchId":"DK-775126",\n      "title":"Solbjerg"\n   },\n   {\n      "branchId":"FBS-751030",\n      "title":"ITK"\n   },\n   {\n      "branchId":"DK-775149",\n      "title":"Sabro"\n   },\n   {\n      "branchId":"DK-775127",\n      "title":"Tranbjerg"\n   },\n   {\n      "branchId":"DK-775160",\n      "title":"Risskov"\n   },\n   {\n      "branchId":"DK-775162",\n      "title":"Hjortshøj"\n   },\n   {\n      "branchId":"DK-775140",\n      "title":"Åby"\n   },\n   {\n      "branchId":"FBS-751009",\n      "title":"Fjernlager 2"\n   },\n   {\n      "branchId":"FBS-751029",\n      "title":"Stadsarkivet"\n   },\n   {\n      "branchId":"FBS-751027",\n      "title":"Intern"\n   },\n   {\n      "branchId":"FBS-751026",\n      "title":"Fælles undervejs"\n   },\n   {\n      "branchId":"FBS-751025",\n      "title":"Fællessekretariatet"\n   },\n   {\n      "branchId":"DK-775133",\n      "title":"Bavnehøj"\n   },\n   {\n      "branchId":"FBS-751024",\n      "title":"Fjernlånte materialer"\n   },\n   {\n      "branchId":"DK-775100",\n      "title":"Hovedbiblioteket"\n   },\n   {\n      "branchId":"DK-775170",\n      "title":"Trige"\n   },\n   {\n      "branchId":"DK-775150",\n      "title":"Tilst"\n   },\n   {\n      "branchId":"DK-775130",\n      "title":"Viby"\n   },\n   {\n      "branchId":"DK-775164",\n      "title":"Egå"\n   }\n]',
  pageSizeDesktop: 20,
  pageSizeMobile: 10,
  ereolenMyPageUrl: "https://ereolen.dk/user/me/",
  pauseReservationInfoUrl:
    "https://images.unsplash.com/photo-1571043733612-d5444ff7d4ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80",
  reservationListHeaderText: "Your reservations",
  reservationListPhysicalReservationsHeaderText: "Physical reservations",
  reservationListDigitalReservationsHeaderText: "Digital reservations",
  reservationListReadyForPickupTitleText: "Ready for pickup",
  reservationListReadyForPickupEmptyText:
    "At the moment you have 0 reservations ready for pickup",
  reservationListPhysicalReservationsEmptyText:
    "At the moment you have 0 physical reservations",
  reservationListAllEmptyText: "At the moment you have 0 reservations",
  reservationListDigitalReservationsEmptyText:
    "At the moment you have 0 reservations on digital items",
  reservationListReadyText: "Ready",
  materialByAuthorText: "By",
  materialAndAuthorText: "and",
  etAlText: "et al.",
  reservationListNumberInQueueText:
    "There are @count people in the queue before you",
  reservationListFirstInQueueText: "You are at the front of the queue",
  reservationListInQueueText: "queued",
  reservationPickUpLatestText: "Pick up before @date",
  publizonEbookText: "E-book",
  publizonAudioBookText: "Audiobook",
  publizonPodcastText: "Podcast",
  reservationListLoanBeforeText: "Borrow before @date",
  reservationListYouAreInQueueText: "You are in the reservation queue",
  reservationListAvailableInText: "Available in @count days",
  reservationListDaysText: "days",
  reservationListDayText: "day",
  reservationDetailsExpiresTitleText: "Pickup deadline",
  reservationDetailsDigitalMaterialExpiresTitleText: "Borrow before",
  reservationDetailsExpiresText: "Your reservation expires @date!",
  reservationDetailsSaveText: "Save",
  reservationDetailsCancelText: "Cancel",
  reservationListPauseReservationText: "Pause your reservations",
  reservationListPauseReservationOnHoldText: "Your reservations are paused",
  reservationListOnHoldAriaText:
    "Reservations have been paused in the following time span: ",
  reservationListPauseReservationAriaModalText:
    "Opens a modal that covers the entire page where it is possible to pause physical reservations",
  reservationListPauseReservationButtonText: "Settings",
  pauseReservationModalHeaderText: "Pause reservations on physical items",
  pauseReservationModalBodyText:
    "Pause your reservations early, since reservations that are already being processed, will not be paused.",
  pauseReservationModalDateRangeLabelText: "Pause period",
  pauseReservationModalDateRangePlaceholderText: "Choose pause period",
  pauseReservationModalCloseModalText: "Close pause reservations modal",
  pauseReservationModalLinkText:
    "Read more about pausing reservertions and what that means here",
  pauseReservationModalSaveButtonLabelText: "Save",
  pauseReservationModalCancelButtonLabelText: "Cancel pause",
  listDetailsNothingSelectedLabelText: "Pick",
  showMoreText: "show more",
  resultPagerStatusText: "Showing @itemsShown out of @hitcount results",
  deleteReservationModalSuccessTitleText:
    '{"type":"plural","text":["Reservation deleted","Reservations deleted"]}',
  deleteReservationModalSuccessStatusText:
    '{"type":"plural","text":["One reservation was deleted","@count reservations were deleted"]}',
  deleteReservationModalErrorsTitleText: "An error occurred",
  deleteReservationModalErrorsStatusText:
    "One or more reservations could not be deleted, please try again.",
  deleteReservationModalDeleteProcessingText: "Processing..."
};
