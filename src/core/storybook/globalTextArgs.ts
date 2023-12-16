export default {
  alertErrorCloseText: {
    name: "Alert error close text",
    defaultValue: "close",
    control: { type: "text" }
  },
  alertErrorMessageText: {
    name: "Alert error message text",
    defaultValue: "An error occurred",
    control: { type: "text" }
  },
  multiselectAllOptionText: {
    name: "Multiselect - all option",
    defaultValue: "All",
    control: { type: "text" }
  },
  groupModalGoToMaterialAriaLabelText: {
    defaultValue: "Go to @label material details",
    control: { type: "text" }
  },
  availabilityAvailableText: {
    name: "Availability: available text",
    defaultValue: "Available",
    control: { type: "text" }
  },
  availabilityUnavailableText: {
    name: "Availability: unavailable text",
    defaultValue: "Unavailable",
    control: { type: "text" }
  },
  loansNotOverdueText: {
    defaultValue: "Longer return time",
    control: { type: "text" }
  },
  patronContactInfoBodyText: {
    defaultValue: "Patron contact info body text",
    control: { type: "text" }
  },
  pauseReservationModalBelowInputsText: {
    defaultValue: "Pause reservation modal below inputs text",
    control: { type: "text" }
  },
  materialDetailsCloseModalAriaLabelText: {
    defaultValue: "Close material details modal",
    control: {
      type: "text"
    }
  },
  findOnShelfExpandButtonExplanationText: {
    name: "Find on shelf expand button explanation text",
    defaultValue: "This button opens a modal",
    control: { type: "text" }
  },
  reservationsStillInQueueForText: {
    defaultValue: "Still in queue",
    control: { type: "text" }
  },
  materialDetailsModalAriaDescriptionText: {
    defaultValue:
      "This modal shows material details, and makes it possible to renew a material, of that material is renewable",
    control: {
      type: "text"
    }
  }
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
}
