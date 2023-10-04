export default {
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
  reservationDetailAllowRemoveReadyReservationsConfig: {
    defaultValue: "1",
    control: { type: "text" }
  },
  interestPeriodsConfig: {
    defaultValue:
      '[\n   {\n      "value":"30",\n      "label":"1 month"\n   },\n   {\n      "value":"60",\n      "label":"2 months"\n   },\n   {\n      "value":"90",\n      "label":"3 months"\n   },\n   {\n      "value":"180",\n      "label":"6 months"\n   },\n   {\n      "value":"360",\n      "label":"1 year"\n   }\n]',
    control: { type: "text" }
  },
  reservationDetailsRemoveDigitalReservationText: {
    defaultValue: "Remove your reservation",
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
  reservationDetailsChangeText: {
    defaultValue: "Apply changes",
    control: { type: "text" }
  },
  reservationDetailsPickUpAtTitleText: {
    defaultValue: "Pickup branch",
    control: { type: "text" }
  },
  reservationDetailsButtonRemoveText: {
    defaultValue: "Remove your reservation",
    control: { type: "text" }
  },
  reservationDetailsStatusTitleText: {
    defaultValue: "Status",
    control: { type: "text" }
  },
  reservationDetailsBorrowBeforeText: {
    defaultValue: "Borrow before @date",
    control: { type: "text" }
  },
  reservationDetailsDigitalReservationGoToEreolenText: {
    defaultValue: "Go to eReolen",
    control: { type: "text" }
  },
  reservationDetailsReadyForLoanText: {
    defaultValue: "Ready for pickup",
    control: { type: "text" }
  },
  reservationDetailsPickupDeadlineTitleText: {
    defaultValue: "Pickup deadline",
    control: { type: "text" }
  },
  reservationDetailsNumberInQueueLabelText: {
    defaultValue: "@count queued",
    control: { type: "text" }
  },
  shiftText: {
    name: "Change",
    defaultValue: "Change",
    control: { type: "text" }
  },
  modalReservationFormPickupHeaderTitleText: {
    name: "Modal reservation form pickup header title",
    defaultValue: "Change pick-up location",
    control: { type: "text" }
  },
  modalReservationFormPickupHeaderDescriptionText: {
    name: "Modal reservation form pickup header description",
    defaultValue:
      "If you wish to change the pick-up location for your reservation, you can do it here.",
    control: { type: "text" }
  },
  modalReservationFormNoInterestAfterHeaderTitleText: {
    name: "Modal reservation form no interest after header title",
    defaultValue: "Change date of interest",
    control: { type: "text" }
  },
  modalReservationFormNoInterestAfterHeaderDescriptionText: {
    name: "Modal reservation form no interest after header description",
    defaultValue:
      "If you wish to change the amount of time after which you're no longer interested in the material, you can do it here.",
    control: { type: "text" }
  },
  saveButtonText: {
    name: "Save button text",
    defaultValue: "Save",
    control: { type: "text" }
  },
  chooseOneText: {
    name: "Choose one text",
    defaultValue: "Choose one",
    control: { type: "text" }
  },
  loadingText: {
    name: "Loading",
    defaultValue: "Loading...",
    control: { type: "text" }
  },
  reservationSuccessTitleText: {
    name: "Reservation success title",
    defaultValue: "Your reservation has been changed",
    control: { type: "text" }
  },
  reservationSuccessSubTitleText: {
    name: "Reservation success sub title",
    defaultValue: "Click the button below to close this window",
    control: { type: "text" }
  },
  reservationerrorTitleText: {
    name: "Reservation error title",
    defaultValue: "Something went wrong",
    control: { type: "text" }
  },
  reservationerrorSubTitleText: {
    name: "Reservation error sub title",
    defaultValue: "Click the button below to close this window and try again",
    control: { type: "text" }
  },
  reservationStatusButtonText: {
    name: "Reservation success button text",
    defaultValue: "Close",
    control: { type: "text" }
  }
};

export interface ReservationMaterialDetailsProps {
  reservationDetailsRemoveDigitalReservationText: string;
  reservationDetailsDateOfReservationTitleText: string;
  reservationDetailsNumberInQueueLabelText: string;
  reservationDetailsNoInterestAfterTitleText: string;
  reservationDetailsChangeText: string;
  reservationDetailsPickUpAtTitleText: string;
  reservationDetailsButtonRemoveText: string;
  reservationDetailsStatusTitleText: string;
  reservationDetailsBorrowBeforeText: string;
  reservationDetailsDigitalReservationGoToEreolenText: string;
  reservationDetailsReadyForLoanText: string;
  reservationDetailsPickupDeadlineTitleText: string;
  interestPeriodsConfig: string;
  reservationDetailAllowRemoveReadyReservationsConfig: string;
  branchesConfig: string;
  blacklistedPickupBranchesConfig: string;
  shiftText: string;
  modalReservationFormPickupHeaderTitleText: string;
  modalReservationFormPickupHeaderDescriptionText: string;
  saveButtonText: string;
  modalReservationFormNoInterestAfterHeaderTitleText: string;
  modalReservationFormNoInterestAfterHeaderDescriptionText: string;
  chooseOneText: string;
  loadingText: string;
  reservationSuccessTitleText: string;
  reservationSuccessSubTitleText: string;
  reservationerrorTitleText: string;
  reservationerrorSubTitleText: string;
  reservationStatusButtonText: string;
}
