import React, { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import CreatePatron from "./CreatePatron.entry";
import pincodeArgs, {
  argTypes as pincodeArgTypes
} from "../../core/storybook/pincodeArgs";
import serviceUrlArgs, {
  argTypes as serviceUrlArgTypes
} from "../../core/storybook/serviceUrlArgs";
import globalTextArgs, {
  argTypes as globalTextArgTypes
} from "../../core/storybook/globalTextArgs";
import globalConfigArgs, {
  argTypes as globalConfigArgTypes
} from "../../core/storybook/globalConfigArgs";
import { TOKEN_UNREGISTERED_USER_KEY, setToken } from "../../core/token";

const meta: Meta<typeof CreatePatron> = {
  title: "Apps / Create patron",
  component: CreatePatron
};

export default meta;
type Story = StoryObj<typeof CreatePatron>;

export const Primary: Story = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: can't figure out how to type pincodeArgTypes, serviceUrlArgTypes and globalTextArgTypes
  argTypes: {
    ...pincodeArgTypes,
    ...serviceUrlArgTypes,
    ...globalTextArgTypes,
    ...globalConfigArgTypes,
    patronPageConfirmPincodeLabelText: {
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "Confirm new pin" }
      },
      control: { type: "text" }
    },
    patronContactNameLabelText: {
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "Name" }
      },
      control: { type: "text" }
    },
    patronPagePincodeTooShortValidationText: {
      table: {
        type: { summary: "text" },
        defaultValue: {
          summary:
            "The pincode should be minimum @pincodeLengthMin and maximum @pincodeLengthMax characters long"
        }
      },
      control: { type: "text" }
    },
    patronPagePincodesNotTheSameText: {
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "The pincodes are not the same" }
      },
      control: { type: "text" }
    },
    patronContactPhoneLabelText: {
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "Phone number" }
      },
      control: { type: "text" }
    },
    patronContactPhoneCheckboxText: {
      table: {
        type: { summary: "text" },
        defaultValue: {
          summary:
            "Receive text messages about your loans, reservations, and so forth"
        }
      },
      control: { type: "text" }
    },
    patronContactEmailLabelText: {
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "E-mail" }
      },
      control: { type: "text" }
    },
    patronContactEmailCheckboxText: {
      table: {
        type: { summary: "text" },
        defaultValue: {
          summary: "Receive emails about your loans, reservations, and so forth"
        }
      },
      control: { type: "text" }
    },
    createPatronHeaderText: {
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "Register as patron" }
      },
      control: { type: "text" }
    },
    createPatronInvalidSsnHeaderText: {
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "Invalid SSN" }
      },
      control: { type: "text" }
    },
    createPatronInvalidSsnBodyText: {
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "This SSN is invalid" }
      },
      control: { type: "text" }
    },
    redirectOnUserCreatedUrl: {
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "https://unsplash.com/photos/KRztl5I6xac" } // open source image of a dank fox
      },
      control: { type: "text" }
    },
    createPatronConfirmButtonText: {
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "Confirm" }
      },
      control: { type: "text" }
    },
    phoneInputMessageText: {
      description: "Phone input validation message",
      table: {
        type: { summary: "text" },
        defaultValue: {
          summary:
            "The phone number must be 6 to 15 characters in length and should be comprised solely of numbers or begin with a +"
        }
      },
      control: { type: "text" }
    },
    fakeCpr: {
      description: "Storybook context cpr",
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "0101901111" }
      },
      control: { type: "text" }
    },
    createPatronCancelButtonText: {
      description: "create patron cancel button text",
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "Cancel" }
      },
      control: { type: "text" }
    },
    patronPagePhoneInputMessageText: {
      description: "patron page phone input message text",
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "Phone number" }
      },
      control: { type: "text" }
    },
    createPatronButtonLoadingText: {
      description: "create patron button loading text",
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "Loading" }
      },
      control: { type: "text" }
    },
    createPatronButtonErrorText: {
      description: "create patron button error text",
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "Error occurred" }
      },
      control: { type: "text" }
    },
    createPatronBranchDropdownNoteText: {
      description: "create patron branch dropdown note text",
      table: {
        type: { summary: "text" },
        defaultValue: {
          summary:
            "Choose preferred library for pickup of your future reservations."
        }
      },
      control: { type: "text" }
    },
    postRegisterRedirectInfoTopText: {
      description: "Redirect info top text",
      table: {
        type: { summary: "text" },
        defaultValue: {
          summary:
            "You are now registered as a user and need to log in again to be able to use the application."
        }
      },
      control: { type: "text" }
    },
    postRegisterRedirectInfoBottomText: {
      description: "Redirect info bottom text",
      table: {
        type: { summary: "text" },
        defaultValue: {
          summary:
            "You will be sent to the Adgangsplatformen to log in again in @seconds seconds."
        }
      },
      control: { type: "text" }
    },
    postRegisterRedirectButtonText: {
      description: "Redirect button text",
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "Log in again" }
      },
      control: { type: "text" }
    },
    librarySelectEmptyStateText: {
      description: "Library select empty state text",
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "Choose library" }
      },
      control: { type: "text" }
    },
    findLibraryDialogTitleText: {
      description: "Find library dialog title text",
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "Find nearest library" }
      },
      control: { type: "text" }
    },
    findLibraryDialogDawaInputLabelText: {
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "Enter your address" }
      },
      control: { type: "text" }
    },
    findLibraryDialogDawaInputPlaceholderText: {
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "Fx Torvegade 1, 1401 København K" }
      },
      control: { type: "text" }
    },
    findLibraryDialogGeoLocationButtonText: {
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "Find nearest library using your location" }
      },
      control: { type: "text" }
    }
  },
  args: {
    ...serviceUrlArgs,
    ...pincodeArgs,
    ...globalTextArgs,
    ...globalConfigArgs,
    authUrl: "/login",
    logoutUrl: "/logout",
    blacklistedPickupBranchesConfig:
      "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
    minAgeConfig: "18",
    branchesConfig: `[{"branchId":"DK-710111","title":"Nørrebro","location":{"address":"Sædding Strandvej 2","city":"6710 Esbjerg V","value":"Sædding Strandvej 2 6710 Esbjerg V","lat":"55.4871","lng":"8.41239"}},{"branchId":"DK-710110","title":"Biblioteket Rentemestervej","location":{"address":"Suomisvej 7 st. 2","city":"1927 Frederiksberg C","value":"Suomisvej 7 st. 2 1927 Frederiksberg C","lat":"55.6795","lng":"12.5563"}},{"branchId":"DK-710113","title":"Sundby","location":{"address":"Baaringvadvænget 2","city":"5580 Nørre Aaby","value":"Baaringvadvænget 2 5580 Nørre Aaby","lat":"55.4534","lng":"9.89213"}},{"branchId":"DK-710112","title":"Solvang","location":{"address":"Banestien 2 ","city":"6310 Broager","value":"Banestien 2 6310 Broager ","lat":"54.8862","lng":"9.67579"}},{"branchId":"DK-710115","title":"Sydhavn"},{"branchId":"DK-710114","title":"Bibliotekshuset"},{"branchId":"DK-710117","title":"Valby"},{"branchId":"DK-710116","title":"Tingbjerg"},{"branchId":"DK-710119","title":"Vesterbro"},{"branchId":"DK-710118","title":"Vanløse"},{"branchId":"DK-710100","title":"Hovedbiblioteket"},{"branchId":"FBS-101011","title":"Fjernlager 4"},{"branchId":"FBS-101012","title":"Fjernlager 5"},{"branchId":"FBS-101017","title":".MÅ ALDRIG BRUGES"},{"branchId":"DK-710120","title":"Vigerslev"},{"branchId":"FBS-101010","title":"Fjernlager 3"},{"branchId":"DK-710122","title":"Ørestad"},{"branchId":"DK-710121","title":"Østerbro"},{"branchId":"DK-710104","title":"Blågården"},{"branchId":"DK-710106","title":"Christianshavn"},{"branchId":"DK-710105","title":"Brønshøj"},{"branchId":"DK-710108","title":"Islands Brygge"},{"branchId":"DK-710107","title":"Husum"},{"branchId":"DK-710109","title":"Øbro Jagtvej"},{"branchId":"FBS-101008","title":"Fjernlager 1"},{"branchId":"FBS-101009","title":"Fjernlager 2"},{"branchId":"FBS-101004","title":"HB Københavns fængsler"},{"branchId":"FBS-101006","title":"Bestilt - ikke modtaget"},{"branchId":"FBS-101007","title":"HB Rigshospitalet"},{"branchId":"FBS-101002","title":"FjernUDlån (afh.sted)"},{"branchId":"FBS-101003","title":"Fjernlager (cso)"}]`,
    branchAddressSearchEnabledConfig: "1",
    dashboardUrl: "/user/me/dashboard",
    agencyConfig: "999999",
    textNotificationsEnabledConfig: "1",
    pickupBranchesDropdownLabelText: "Choose pickup branch",
    patronPageChangePincodeHeaderText: "Pincode",
    pickupBranchesDropdownNothingSelectedText: "Nothing selected",
    patronPagePincodeLabelText: "New pin",
    patronPageConfirmPincodeLabelText: "Confirm new pin",
    patronContactNameLabelText: "Name",
    patronPagePincodeTooShortValidationText:
      "The pincode should be minimum @pincodeLengthMin and maximum @pincodeLengthMax characters long",
    patronPagePincodesNotTheSameText: "The pincodes are not the same",
    patronContactPhoneLabelText: "Phone number",
    patronContactPhoneCheckboxText:
      "Receive text messages about your loans, reservations, and so forth",
    patronContactEmailLabelText: "E-mail",
    patronContactEmailCheckboxText:
      "Receive emails about your loans, reservations, and so forth",
    createPatronHeaderText: "Register as patron",
    createPatronInvalidSsnHeaderText: "Invalid SSN",
    createPatronInvalidSsnBodyText: "This SSN is invalid",
    redirectOnUserCreatedUrl: "https://unsplash.com/photos/KRztl5I6xac", // open source image of a dank fox
    createPatronConfirmButtonText: "Confirm",
    phoneInputMessageText:
      "The phone number must be 6 to 15 characters in length and should be comprised solely of numbers or begin with a +",
    fakeCpr: "0101901111",
    createPatronCancelButtonText: "Cancel",
    patronPagePhoneInputMessageText: "Phone number",
    createPatronButtonLoadingText: "Loading",
    createPatronButtonErrorText: "Error occurred",
    createPatronBranchDropdownNoteText:
      "Choose preferred library for pickup of your future reservations.",
    postRegisterRedirectInfoTopText:
      "You are now registered as a user and need to log in again to be able to use the application.",
    postRegisterRedirectInfoBottomText:
      "You will be sent to the Adgangsplatformen to log in again in @seconds seconds.",
    postRegisterRedirectButtonText: "Log in again",

    librarySelectEmptyStateText: "Choose library",
    findLibraryDialogTitleText: "Find nearest library",
    findLibraryDialogDawaInputLabelText: "Enter your address",
    findLibraryDialogDawaInputPlaceholderText:
      "Ex. Torvegade 1, 1401 København K",
    findLibraryDialogGeoLocationButtonText:
      "Find nearest library using your location",
    findLibraryDialogSuggestionsListLabelText: "Choose library"
  },
  decorators: [
    (Story) => {
      useEffect(() => {
        setToken(TOKEN_UNREGISTERED_USER_KEY, "123456");
      }, []);
      return <Story />;
    }
  ]
};
