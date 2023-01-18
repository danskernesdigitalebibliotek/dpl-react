export default {
  blockedPatronDTitleText: {
    defaultValue: "D Title",
    control: { type: "text" }
  },
  blockedPatronDBodyText: {
    defaultValue: "Lorem ipsum",
    control: { type: "text" }
  },
  blockedPatronSTitleText: {
    defaultValue: "S Title",
    control: { type: "text" }
  },
  blockedPatronSBodyText: {
    defaultValue: "Lorem ipsum",
    control: { type: "text" }
  },
  blockedPatronFTitleText: {
    defaultValue: "F Title",
    control: { type: "text" }
  },
  blockedPatronFBodyText: {
    defaultValue: "Lorem ipsum",
    control: { type: "text" }
  },
  blockedPatronETitleText: {
    defaultValue: "You have exceeded your fee limit",
    control: { type: "text" }
  },
  blockedPatronEBodyText: {
    defaultValue:
      "You are therefore not able to borrow or reserve materials from the library",
    control: { type: "text" }
  },
  blockedPatronWTitleText: {
    defaultValue: "Your user is blocked",
    control: { type: "text" }
  },
  blockedPatronWBodyText: {
    defaultValue:
      "You therefore cannot reserve, borrow or renew loans. Please contact the library for further information",
    control: { type: "text" }
  },
  blockedPatronOTitleText: {
    defaultValue: "O title",
    control: { type: "text" }
  },
  blockedPatronOBodyText: {
    defaultValue: "Lorem ipsum",
    control: { type: "text" }
  },
  blockedPatronUTitleText: {
    defaultValue: "Your user is blocked",
    control: { type: "text" }
  },
  blockedPatronUBodyText: {
    defaultValue:
      "You therefore cannot reserve, borrow or renew loans. $Please contact the library for further information",
    control: { type: "text" }
  },
  blockedPatronELinkText: {
    defaultValue: "Pay your fees here",
    control: { type: "text" }
  },
  blockedPatronELinkUrl: {
    // Open source image of a thoughtful ape
    defaultValue:
      "https://images.unsplash.com/photo-1463852247062-1bbca38f7805?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2676&q=80",
    control: { type: "text" }
  },
  blockedPatronCloseModalAriaLabelText: {
    control: {
      type: "text"
    },
    defaultValue: "Close blocked patron modal"
  },
  blockedPatronModalAriaDescriptionText: {
    control: {
      type: "text"
    },
    defaultValue: "This modal alerts you, that your patron has been blocked"
  }
};

export interface BlockedPatronEntryTextProps {
  blockedPatronDTitleText: string;
  blockedPatronDBodyText: string;
  blockedPatronSTitleText: string;
  blockedPatronSBodyText: string;
  blockedPatronFTitleText: string;
  blockedPatronFBodyText: string;
  blockedPatronETitleText: string;
  blockedPatronEBodyText: string;
  blockedPatronWTitleText: string;
  blockedPatronWBodyText: string;
  blockedPatronOTitleText: string;
  blockedPatronOBodyText: string;
  blockedPatronUTitleText: string;
  blockedPatronUBodyText: string;
  blockedPatronELinkText: string;
  blockedPatronELinkUrl: string;
  blockedPatronCloseModalAriaLabelText: string;
  blockedPatronModalAriaDescriptionText: string;
  BlockedPatronEntryTextProps: string;
}
