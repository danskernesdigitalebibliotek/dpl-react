export const argTypes = {
  blockedPatronDTitleText: {
    table: {
      defaultValue: { summary: "D Title" },
      type: { summary: "text" }
    },
    control: { type: "text" }
  },
  blockedPatronDBodyText: {
    table: {
      defaultValue: { summary: "Lorem ipsum" },
      type: { summary: "text" }
    },
    control: { type: "text" }
  },
  blockedPatronSTitleText: {
    table: {
      defaultValue: { summary: "S Title" },
      type: { summary: "text" }
    },
    control: { type: "text" }
  },
  blockedPatronSBodyText: {
    table: {
      defaultValue: { summary: "Lorem ipsum" },
      type: { summary: "text" }
    },
    control: { type: "text" }
  },
  blockedPatronFTitleText: {
    table: {
      defaultValue: { summary: "F Title" },
      type: { summary: "text" }
    },
    control: { type: "text" }
  },
  blockedPatronFBodyText: {
    table: {
      defaultValue: { summary: "Lorem ipsum" },
      type: { summary: "text" }
    },
    control: { type: "text" }
  },
  blockedPatronETitleText: {
    table: {
      defaultValue: { summary: "You have exceeded your fee limit" },
      type: { summary: "text" }
    },
    control: { type: "text" }
  },
  blockedPatronEBodyText: {
    table: {
      defaultValue: {
        summary:
          "You are therefore not able to borrow or reserve materials from the library"
      },
      type: { summary: "text" }
    },
    control: { type: "text" }
  },
  blockedPatronWTitleText: {
    table: {
      defaultValue: { summary: "Your user is blocked" },
      type: { summary: "text" }
    },
    control: { type: "text" }
  },
  blockedPatronWBodyText: {
    table: {
      defaultValue: {
        summary:
          "You therefore cannot reserve, borrow or renew loans. Please contact the library for further information"
      },
      type: { summary: "text" }
    },
    control: { type: "text" }
  },
  blockedPatronOTitleText: {
    table: {
      defaultValue: { summary: "O title" },
      type: { summary: "text" }
    },
    control: { type: "text" }
  },
  blockedPatronOBodyText: {
    table: {
      defaultValue: { summary: "Lorem ipsum" },
      type: { summary: "text" }
    },
    control: { type: "text" }
  },
  blockedPatronUTitleText: {
    table: {
      defaultValue: { summary: "Your user is blocked" },
      type: { summary: "text" }
    },
    control: { type: "text" }
  },
  blockedPatronUBodyText: {
    table: {
      defaultValue: {
        summary:
          "You therefore cannot reserve, borrow or renew loans. Please contact the library for further information"
      },
      type: { summary: "text" }
    },
    control: { type: "text" }
  },
  blockedPatronELinkText: {
    table: {
      defaultValue: { summary: "Pay your fees here" },
      type: { summary: "text" }
    },
    control: { type: "text" }
  },
  blockedPatronELinkUrl: {
    table: {
      defaultValue: { summary: "https://unsplash.com/photos/r077pfFsdaU" },
      type: { summary: "text" }
    },
    control: { type: "text" }
  },
  blockedPatronCloseModalAriaLabelText: {
    table: {
      defaultValue: { summary: "Close blocked patron modal" },
      type: { summary: "text" }
    },
    control: { type: "text" }
  },
  blockedPatronModalAriaDescriptionText: {
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "This modal alerts you, that your patron has been blocked"
      }
    },
    control: { type: "text" }
  },
  redirectOnBlockedUrl: {
    table: {
      defaultValue: { summary: "https://unsplash.com/photos/r077pfFsdaU" },
      type: { summary: "text" }
    },
    control: { type: "text" }
  }
};

export default {
  blockedPatronDTitleText: "D Title",
  blockedPatronDBodyText: "Lorem ipsum",
  blockedPatronSTitleText: "S Title",
  blockedPatronSBodyText: "Lorem ipsum",
  blockedPatronFTitleText: "F Title",
  blockedPatronFBodyText: "Lorem ipsum",
  blockedPatronETitleText: "You have exceeded your fee limit",
  blockedPatronEBodyText:
    "You are therefore not able to borrow or reserve materials from the library",
  blockedPatronWTitleText: "Your user is blocked",
  blockedPatronWBodyText:
    "You therefore cannot reserve, borrow or renew loans. Please contact the library for further information",
  blockedPatronOTitleText: "O title",
  blockedPatronOBodyText: "Lorem ipsum",
  blockedPatronUTitleText: "Your user is blocked",
  blockedPatronUBodyText:
    "You therefore cannot reserve, borrow or renew loans. Please contact the library for further information",
  blockedPatronELinkText: "Pay your fees here",
  blockedPatronELinkUrl: "https://unsplash.com/photos/r077pfFsdaU",
  blockedPatronCloseModalAriaLabelText: "Close blocked patron modal",
  blockedPatronModalAriaDescriptionText:
    "This modal alerts you, that your patron has been blocked",
  redirectOnBlockedUrl: "https://unsplash.com/photos/r077pfFsdaU"
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
  redirectOnBlocked: string;
}
