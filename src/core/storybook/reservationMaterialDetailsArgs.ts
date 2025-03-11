export const argTypes = {
  blacklistedPickupBranchesConfig: {
    description: "Blacklisted branches",
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024"
      }
    },
    control: { type: "text" }
  },
  branchesConfig: {
    description: "Branches",
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: `[{"branchId":"DK-775120","title":"Højbjerg"},{"branchId":"DK-775122","title":"Beder-Malling"},{"branchId":"DK-775144","title":"Gellerup"},{"branchId":"DK-775167","title":"Lystrup"},{"branchId":"DK-775146","title":"Harlev"},{"branchId":"DK-775168","title":"Skødstrup"},{"branchId":"FBS-751010","title":"Arresten"},{"branchId":"DK-775147","title":"Hasle"},{"branchId":"FBS-751032","title":"Må ikke benyttes"},{"branchId":"FBS-751031","title":"Fjernlager 1"},{"branchId":"DK-775126","title":"Solbjerg"},{"branchId":"FBS-751030","title":"ITK"},{"branchId":"DK-775149","title":"Sabro"},{"branchId":"DK-775127","title":"Tranbjerg"},{"branchId":"DK-775160","title":"Risskov"},{"branchId":"DK-775162","title":"Hjortshøj"},{"branchId":"DK-775140","title":"Åby"},{"branchId":"FBS-751009","title":"Fjernlager 2"},{"branchId":"FBS-751029","title":"Stadsarkivet"},{"branchId":"FBS-751027","title":"Intern"},{"branchId":"FBS-751026","title":"Fælles undervejs"},{"branchId":"FBS-751025","title":"Fællessekretariatet"},{"branchId":"DK-775133","title":"Bavnehøj"},{"branchId":"FBS-751024","title":"Fjernlånte materialer"},{"branchId":"DK-775100","title":"Hovedbiblioteket"},{"branchId":"DK-775170","title":"Trige"},{"branchId":"DK-775150","title":"Tilst"},{"branchId":"DK-775130","title":"Viby"},{"branchId":"DK-775164","title":"Egå"}]`
      }
    },
    control: { type: "text" }
  },
  reservationDetailsConfig: {
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: `{"allowRemoveReadyReservations": true}`
      }
    },
    control: { type: "text" }
  },
  interestPeriodsConfig: {
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: `{"interestPeriods":[{"value":14,"label":"14 days"},{"value":30,"label":"1 month"},{"value":60,"label":"2 months"},{"value":90,"label":"3 months"},{"value":180,"label":"6 months"},{"value":365,"label":"1 year"}],"defaultInterestPeriod":{"value":14,"label":"14 days"}}`
      }
    },
    control: { type: "text" }
  },
  reservationDetailsRemoveDigitalReservationText: {
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "Remove your reservation"
      }
    },
    control: { type: "text" }
  },
  reservationDetailsDateOfReservationTitleText: {
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "Date of reservation"
      }
    },
    control: { type: "text" }
  },
  reservationDetailsNoInterestAfterTitleText: {
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "Not interested after"
      }
    },
    control: { type: "text" }
  },
  reservationDetailsChangeText: {
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "Apply changes"
      }
    },
    control: { type: "text" }
  },
  reservationDetailsPickUpAtTitleText: {
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "Pickup branch"
      }
    },
    control: { type: "text" }
  },
  reservationDetailsButtonRemoveText: {
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "Remove your reservation"
      }
    },
    control: { type: "text" }
  },
  reservationDetailsStatusTitleText: {
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "Status"
      }
    },
    control: { type: "text" }
  },
  reservationDetailsBorrowBeforeText: {
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "Borrow before @date"
      }
    },
    control: { type: "text" }
  },
  reservationDetailsReadyForLoanText: {
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "Ready for pickup"
      }
    },
    control: { type: "text" }
  },
  reservationDetailsPickupDeadlineTitleText: {
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "Pickup deadline"
      }
    },
    control: { type: "text" }
  },
  reservationDetailsNumberInQueueLabelText: {
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "@count queued"
      }
    },
    control: { type: "text" }
  },
  shiftText: {
    description: "Change",
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "Change"
      }
    },
    control: { type: "text" }
  },
  modalReservationFormPickupHeaderTitleText: {
    description: "Modal reservation form pickup header title",
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "Change pick-up location"
      }
    },
    control: { type: "text" }
  },
  modalReservationFormPickupHeaderDescriptionText: {
    description: "Modal reservation form pickup header description",
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary:
          "If you wish to change the pick-up location for your reservation, you can do it here."
      }
    },
    control: { type: "text" }
  },
  modalReservationFormNoInterestAfterHeaderTitleText: {
    description: "Modal reservation form no interest after header title",
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "Change date of interest"
      }
    },
    control: { type: "text" }
  },
  modalReservationFormNoInterestAfterHeaderDescriptionText: {
    description: "Modal reservation form no interest after header description",
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary:
          "If you wish to change the amount of time after which you're no longer interested in the material, you can do it here."
      }
    },
    control: { type: "text" }
  },
  saveButtonText: {
    description: "Save button text",
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "Save"
      }
    },
    control: { type: "text" }
  },
  chooseOneText: {
    description: "Choose one text",
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "Choose one"
      }
    },
    control: { type: "text" }
  },
  loadingText: {
    description: "Loading",
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "Loading..."
      }
    },
    control: { type: "text" }
  },
  reservationSuccessTitleText: {
    description: "Reservation success title",
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "Your reservation has been changed"
      }
    },
    control: { type: "text" }
  },
  reservationSuccessSubTitleText: {
    description: "Reservation success sub title",
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "Click the button below to close this window"
      }
    },
    control: { type: "text" }
  },
  reservationerrorTitleText: {
    description: "Reservation error title",
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "Something went wrong"
      }
    },
    control: { type: "text" }
  },
  reservationerrorSubTitleText: {
    description: "Reservation error sub title",
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "Click the button below to close this window and try again"
      }
    },
    control: { type: "text" }
  },
  reservationStatusButtonText: {
    description: "Reservation success button text",
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "Close"
      }
    },
    control: { type: "text" }
  }
};

export default {
  reservationDetailsRemoveDigitalReservationText: "Remove your reservation",
  reservationDetailsDateOfReservationTitleText: "Date of reservation",
  reservationDetailsNumberInQueueLabelText: "@count queued",
  reservationDetailsNoInterestAfterTitleText: "Not interested after",
  reservationDetailsChangeText: "Apply changes",
  reservationDetailsPickUpAtTitleText: "Pickup branch",
  reservationDetailsButtonRemoveText: "Remove your reservation",
  reservationDetailsStatusTitleText: "Status",
  reservationDetailsBorrowBeforeText: "Borrow before @date",
  reservationDetailsReadyForLoanText: "Ready for pickup",
  reservationDetailsPickupDeadlineTitleText: "Pickup deadline",
  interestPeriodsConfig:
    '{"interestPeriods":[ { "value":14, "label":"14 days" }, { "value":30, "label":"1 month" }, { "value":60, "label":"2 months" }, { "value":90, "label":"3 months" }, { "value":180, "label":"6 months" }, { "value":365, "label":"1 year" } ], "defaultInterestPeriod":{ "value":14, "label":"14 days" } }',
  reservationDetailsConfig: '{"allowRemoveReadyReservations": true}',
  branchesConfig:
    '[{ "branchId":"DK-775120", "title":"Højbjerg" }, { "branchId":"DK-775122", "title":"Beder-Malling" }, { "branchId":"DK-775144", "title":"Gellerup" }, { "branchId":"DK-775167", "title":"Lystrup" }, { "branchId":"DK-775146", "title":"Harlev" }, { "branchId":"DK-775168", "title":"Skødstrup" }, { "branchId":"FBS-751010", "title":"Arresten" }, { "branchId":"DK-775147", "title":"Hasle" }, { "branchId":"FBS-751032", "title":"Må ikke benyttes" }, { "branchId":"FBS-751031", "title":"Fjernlager 1" }, { "branchId":"DK-775126", "title":"Solbjerg" }, { "branchId":"FBS-751030", "title":"ITK" }, { "branchId":"DK-775149", "title":"Sabro" }, { "branchId":"DK-775127", "title":"Tranbjerg" }, { "branchId":"DK-775160", "title":"Risskov" }, { "branchId":"DK-775162", "title":"Hjortshøj" }, { "branchId":"DK-775140", "title":"Åby" }, { "branchId":"FBS-751009", "title":"Fjernlager 2" }, { "branchId":"FBS-751029", "title":"Stadsarkivet" }, { "branchId":"FBS-751027", "title":"Intern" }, { "branchId":"FBS-751026", "title":"Fælles undervejs" }, { "branchId":"FBS-751025", "title":"Fællessekretariatet" }, { "branchId":"DK-775133", "title":"Bavnehøj" }, { "branchId":"FBS-751024", "title":"Fjernlånte materialer" }, { "branchId":"DK-775100", "title":"Hovedbiblioteket" }, { "branchId":"DK-775170", "title":"Trige" }, { "branchId":"DK-775150", "title":"Tilst" }, { "branchId":"DK-775130", "title":"Viby" }, { "branchId":"DK-775164", "title":"Egå" }]',
  blacklistedPickupBranchesConfig:
    "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
  shiftText: "Change",
  modalReservationFormPickupHeaderTitleText: "Change pick-up location",
  modalReservationFormPickupHeaderDescriptionText:
    "If you wish to change the pick-up location for your reservation, you can do it here.",
  saveButtonText: "Save",
  modalReservationFormNoInterestAfterHeaderTitleText: "Change date of interest",
  modalReservationFormNoInterestAfterHeaderDescriptionText:
    "If you wish to change the amount of time after which you're no longer interested in the material, you can do it here.",
  chooseOneText: "Choose one",
  loadingText: "Loading...",
  reservationSuccessTitleText: "Your reservation has been changed",
  reservationSuccessSubTitleText: "Click the button below to close this window",
  reservationerrorTitleText: "Something went wrong",
  reservationerrorSubTitleText:
    "Click the button below to close this window and try again",
  reservationStatusButtonText: "Close"
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
  reservationDetailsReadyForLoanText: string;
  reservationDetailsPickupDeadlineTitleText: string;
  interestPeriodsConfig: string;
  reservationDetailsConfig: string;
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
