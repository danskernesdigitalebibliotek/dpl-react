export const argTypes = {
  alertErrorCloseText: {
    description: "Alert error close text",
    table: {
      defaultValue: { summary: "close" }
    },
    control: { type: "text" }
  },
  alertErrorMessageText: {
    description: "Alert error message text",
    table: {
      defaultValue: { summary: "An error occurred" }
    },
    control: { type: "text" }
  },
  multiselectAllOptionText: {
    description: "Multiselect - all option",
    table: {
      defaultValue: { summary: "All" }
    },
    control: { type: "text" }
  },
  groupModalGoToMaterialAriaLabelText: {
    table: {
      defaultValue: { summary: "Go to @label material details" }
    },
    control: { type: "text" }
  },
  availabilityAvailableText: {
    description: "Availability: available text",
    table: {
      defaultValue: { summary: "Available" }
    },
    control: { type: "text" }
  },
  availabilityUnavailableText: {
    description: "Availability: unavailable text",
    table: {
      defaultValue: { summary: "Unavailable" }
    },
    control: { type: "text" }
  },
  loansNotOverdueText: {
    table: {
      defaultValue: { summary: "Longer return time" }
    },
    control: { type: "text" }
  },
  patronContactInfoBodyText: {
    table: {
      defaultValue: { summary: "Patron contact info body text" }
    },
    control: { type: "text" }
  },
  pauseReservationModalBelowInputsText: {
    table: {
      defaultValue: { summary: "Pause reservation modal below inputs text" }
    },
    control: { type: "text" }
  },
  materialDetailsCloseModalAriaLabelText: {
    table: {
      defaultValue: { summary: "Close material details modal" }
    },
    control: { type: "text" }
  },
  findOnShelfExpandButtonExplanationText: {
    description: "Find on shelf expand button explanation text",
    table: {
      defaultValue: { summary: "This button opens a modal" }
    },
    control: { type: "text" }
  },
  reservationsStillInQueueForText: {
    table: {
      defaultValue: { summary: "Still in queue" }
    },
    control: { type: "text" }
  },
  materialDetailsModalAriaDescriptionText: {
    table: {
      defaultValue: {
        summary:
          "This modal shows material details, and makes it possible to renew a material, of that material is renewable"
      }
    },
    control: { type: "text" }
  },
  changePickupLocationText: {
    description: "Change pickup location text",
    table: {
      defaultValue: { summary: "Change pickup location" }
    },
    control: { type: "text" }
  },
  changeInterestPeriodText: {
    description: "Change interest period text",
    table: {
      defaultValue: { summary: "Change interest period" }
    },
    control: { type: "text" }
  },
  modalReservationFormPickupLabelText: {
    description: "Modal reservation form pickup branch input label",
    table: {
      defaultValue: { summary: "Change pickup location for your reservation." }
    },
    control: { type: "text" }
  },
  screenReaderModalDescriptionPickupText: {
    description: "Screen reader modal description for pickup",
    table: {
      defaultValue: { summary: "Change pickup location modal" }
    },
    control: { type: "text" }
  },
  closeModalAriaLabelPickupText: {
    description: "Close modal aria-label pickup",
    table: {
      defaultValue: { summary: "Close pickup location modal" }
    },
    control: { type: "text" }
  },
  modalReservationFormNoInterestAfterHeaderTitleText: {
    description: "Modal reservation form no interest after header title",
    table: {
      defaultValue: { summary: "Change date of interest" }
    },
    control: { type: "text" }
  },
  modalReservationFormNoInterestAfterHeaderDescriptionText: {
    description: "Modal reservation form no interest after header description",
    table: {
      defaultValue: {
        summary:
          "If you wish to change the amount of time after which you're no longer interested in the material, you can do it here."
      }
    },
    control: { type: "text" }
  },
  modalReservationFormNoInterestAfterLabelText: {
    description: "Modal reservation form no interest after input label",
    table: {
      defaultValue: {
        summary:
          "Change the amount of time after which you're no longer interested in this material."
      }
    },
    control: { type: "text" }
  },
  screenReaderModalDescriptionInterestPeriodText: {
    description: "Screen reader modal description for interest period",
    table: {
      defaultValue: { summary: "Change interest period modal" }
    },
    control: { type: "text" }
  },
  screenReaderModalDescriptionEmailText: {
    description: "Screen reader modal description for email",
    table: {
      defaultValue: { summary: "Change email modal" }
    },
    control: { type: "text" }
  },
  screenReaderModalDescriptionSmsText: {
    description: "Screen reader modal description for sms",
    table: {
      defaultValue: { summary: "Change mobile number modal" }
    },
    control: { type: "text" }
  },
  closeModalAriaLabelInterestPeriodText: {
    description: "Close modal aria-label interest period ",
    table: {
      defaultValue: { summary: "Close interest period modal" }
    },
    control: { type: "text" }
  },
  closeModalAriaLabelSmsText: {
    description: "Close modal aria-label sms",
    table: {
      defaultValue: { summary: "Close change mobile number modal" }
    },
    control: { type: "text" }
  },
  closeModalAriaLabelEmailText: {
    description: "Close modal aria-label email",
    table: {
      defaultValue: { summary: "Close change email modal" }
    },
    control: { type: "text" }
  },
  deleteReservationModalButtonText: {
    description: "Delete reservation modal delete button text",
    table: {
      defaultValue: { summary: "Ok" }
    },
    control: { type: "text" }
  },
  acceptModalAriaLabelText: {
    table: {
      defaultValue: { summary: "accept modal aria label text" }
    },
    control: { type: "text" }
  },
  pauseReservationModalAriaDescriptionText: {
    table: {
      defaultValue: {
        summary:
          "This modal makes it possible to pause your physical reservations"
      }
    },
    control: { type: "text" }
  },
  addToFavoritesAriaLabelText: {
    table: {
      defaultValue: { summary: "Add @title to favorites list" }
    },
    control: { type: "text" }
  },
  removeFromFavoritesAriaLabelText: {
    table: {
      defaultValue: { summary: "Remove @title from favorites list" }
    },
    control: { type: "text" }
  },
  acceptModalAriaDescriptionText: {
    table: {
      defaultValue: { summary: "accept modal aria description text" }
    },
    control: { type: "text" }
  },
  acceptModalHeaderText: {
    table: {
      defaultValue: { summary: "Hov, dit gebyr forhøjes!" }
    },
    control: { type: "text" }
  },
  acceptModalBodyText: {
    table: {
      defaultValue: {
        summary:
          "Fornyer du dine lån, forhøjes dit gebyr. Alle materialer ikke kan fornys og lånet splittes derfor op. Ved overskredne lån modtager du et gebyr pr. lån og derfor forhøjes dit samlede gebyr, hvis du vælger at gå videre med at fornye."
      }
    },
    control: { type: "text" }
  },
  acceptModalAreYouSureText: {
    table: {
      defaultValue: { summary: "Er du sikker på du vil fornye?" }
    },
    control: { type: "text" }
  },
  acceptModalAcceptButtonText: {
    table: {
      defaultValue: { summary: "Ja, forny mulige" }
    },
    control: { type: "text" }
  },
  acceptModalCancelButtonText: {
    table: {
      defaultValue: { summary: "Annuller fornyelse" }
    },
    control: { type: "text" }
  },
  isLoadingHeartText: {
    table: {
      defaultValue: { summary: "Indlæser" }
    },
    control: { type: "text" }
  },
  reservationPickUpLatestText: {
    table: {
      defaultValue: { summary: "Pick up before @date" }
    },
    control: { type: "text" }
  },
  reservationListReadyText: {
    table: {
      defaultValue: { summary: "Ready" }
    },
    control: { type: "text" }
  },
  reservationListDigitalPickupText: {
    table: {
      defaultValue: { summary: "Online access" }
    },
    control: { type: "text" }
  },
  errorBoundaryAlertBodyButtonAriaText: {
    table: {
      defaultValue: { summary: "Close error message" }
    },
    control: { type: "text" }
  },
  loadingText: {
    table: {
      defaultValue: { summary: "Loading..." }
    },
    control: { type: "text" }
  },
  pincodeSectionDescriptionText: {
    table: {
      defaultValue: { summary: "Length of 4 characters" }
    },
    control: { type: "text" }
  },
  wayfinderModalDescriptionText: {
    defaultValue: "Description about EW",
    control: { type: "text" }
  },
  wayfinderCloseModalLabelText: {
    defaultValue: "Close modal EW",
    control: { type: "text" }
  }
};

export default {
  alertErrorCloseText: "close",
  alertErrorMessageText: "An error occurred",
  multiselectAllOptionText: "All",
  groupModalGoToMaterialAriaLabelText: "Go to @label material details",
  availabilityAvailableText: "Available",
  availabilityUnavailableText: "Unavailable",
  loansNotOverdueText: "Longer return time",
  patronContactInfoBodyText: "Patron contact info body text",
  pauseReservationModalBelowInputsText:
    "Pause reservation modal below inputs text",
  materialDetailsCloseModalAriaLabelText: "Close material details modal",
  findOnShelfExpandButtonExplanationText: "This button opens a modal",
  reservationsStillInQueueForText: "Still in queue",
  materialDetailsModalAriaDescriptionText:
    "This modal shows material details, and makes it possible to renew a material, of that material is renewable",
  changePickupLocationText: "Change pickup location",
  changeInterestPeriodText: "Change interest period",
  modalReservationFormPickupLabelText:
    "Change pickup location for your reservation.",
  screenReaderModalDescriptionPickupText: "Change pickup location modal",
  closeModalAriaLabelPickupText: "Close pickup location modal",
  modalReservationFormNoInterestAfterHeaderTitleText: "Change date of interest",
  modalReservationFormNoInterestAfterHeaderDescriptionText:
    "If you wish to change the amount of time after which you're no longer interested in the material, you can do it here.",
  modalReservationFormNoInterestAfterLabelText:
    "Change the amount of time after which you're no longer interested in this material.",
  screenReaderModalDescriptionInterestPeriodText:
    "Change interest period modal",
  screenReaderModalDescriptionEmailText: "Change email modal",
  screenReaderModalDescriptionSmsText: "Change mobile number modal",
  closeModalAriaLabelInterestPeriodText: "Close interest period modal",
  closeModalAriaLabelSmsText: "Close change mobile number modal",
  closeModalAriaLabelEmailText: "Close change email modal",
  deleteReservationModalButtonText: "Ok",
  acceptModalAriaLabelText: "accept modal aria label text",
  pauseReservationModalAriaDescriptionText:
    "This modal makes it possible to pause your physical reservations",
  addToFavoritesAriaLabelText: "Add @title to favorites list",
  removeFromFavoritesAriaLabelText: "Remove @title from favorites list",
  acceptModalAriaDescriptionText: "accept modal aria description text",
  acceptModalHeaderText: "Hov, dit gebyr forhøjes!",
  acceptModalBodyText:
    "Fornyer du dine lån, forhøjes dit gebyr. Alle materialer ikke kan fornys og lånet splittes derfor op. Ved overskredne lån modtager du et gebyr pr. lån og derfor forhøjes dit samlede gebyr, hvis du vælger at gå videre med at fornye.",
  acceptModalAreYouSureText: "Er du sikker på du vil fornye?",
  acceptModalAcceptButtonText: "Ja, forny mulige",
  acceptModalCancelButtonText: "Annuller fornyelse",
  isLoadingHeartText: "Indlæser",
  reservationPickUpLatestText: "Pick up before @date",
  reservationListReadyText: "Ready",
  reservationListDigitalPickupText: "Online access",
  errorBoundaryAlertBodyButtonAriaText: "Close error message",
  loadingText: "Loading...",
  pincodeSectionDescriptionText: "Length of 4 characters"
};

export interface GlobalEntryTextProps {
  alertErrorCloseText: string;
  alertErrorMessageText: string;
  multiselectAllOptionText: string;
  groupModalGoToMaterialAriaLabelText: string;
  availabilityAvailableText: string;
  availabilityUnavailableText: string;
  loansNotOverdueText: string;
  patronContactInfoBodyText: string;
  pauseReservationModalBelowInputsText: string;
  materialDetailsCloseModalAriaLabelText: string;
  findOnShelfExpandButtonExplanationText: string;
  reservationsStillInQueueForText: string;
  materialDetailsModalAriaDescriptionText: string;
  changePickupLocationText: string;
  changeInterestPeriodText: string;
  modalReservationFormPickupLabelText: string;
  screenReaderModalDescriptionPickupText: string;
  closeModalAriaLabelPickupText: string;
  modalReservationFormNoInterestAfterHeaderTitleText: string;
  modalReservationFormNoInterestAfterHeaderDescriptionText: string;
  modalReservationFormNoInterestAfterLabelText: string;
  screenReaderModalDescriptionEmailText: string;
  screenReaderModalDescriptionInterestPeriodText: string;
  screenReaderModalDescriptionSmsText: string;
  closeModalAriaLabelEmailText: string;
  closeModalAriaLabelInterestPeriodText: string;
  closeModalAriaLabelSmsText: string;
  deleteReservationModalButtonText: string;
  pauseReservationModalAriaDescriptionText: string;
  acceptModalAriaDescriptionText: string;
  addToFavoritesAriaLabelText: string;
  removeFromFavoritesAriaLabelText: string;
  acceptModalAriaLabelText: string;
  acceptModalHeaderText: string;
  acceptModalAreYouSureText: string;
  acceptModalBodyText: string;
  acceptModalCancelButtonText: string;
  acceptModalAcceptButtonText: string;
  isLoadingHeartText: string;
  reservationPickUpLatestText: string;
  reservationListReadyText: string;
  reservationListDigitalPickupText: string;
  pincodeSectionDescriptionText: string;
  errorBoundaryAlertBodyButtonAriaText: string;
  buttonText: string;
  etAlText: string;
}
