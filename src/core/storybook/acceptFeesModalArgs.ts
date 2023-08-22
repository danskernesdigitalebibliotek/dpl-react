export default {
  acceptModalHeaderText: {
    defaultValue: "Hov, dit gebyr forhøjes!",
    control: { type: "text" }
  },
  acceptModalBodyText: {
    defaultValue:
      "Fornyer du dine lån, forhøjes dit gebyr. Alle materialer ikke kan fornys og lånet splittes derfor op. Ved overskredne lån modtager du et gebyr pr. lån og derfor forhøjes dit samlede gebyr, hvis du vælger at gå videre med at fornye.",
    control: { type: "text" }
  },
  acceptModalAreYouSureText: {
    defaultValue: "Er du sikker på du vil fornye?",
    control: { type: "text" }
  },
  acceptModalAcceptButtonText: {
    defaultValue: "Ja, forny mulige",
    control: { type: "text" }
  },
  acceptModalCancelButtonText: {
    defaultValue: "Annuller fornyelse",
    control: { type: "text" }
  },
  acceptModalAriaDescriptionText: {
    defaultValue: "accept modal aria description text",
    control: { type: "text" }
  },
  acceptModalAriaLabelText: {
    defaultValue: "accept modal aria label text",
    control: { type: "text" }
  }
};

export interface AcceptFeesModalEntryTextProps {
  acceptModalHeaderText: string;
  acceptModalAreYouSureText: string;
  acceptModalBodyText: string;
  acceptModalCancelButtonText: string;
  acceptModalAcceptButtonText: string;
  acceptModalAriaDescriptionText: string;
  acceptModalAriaLabelText: string;
}
