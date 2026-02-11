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
    },
    findLibraryDialogSuggestionsListLabelText: {
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "Choose library" }
      },
      control: { type: "text" }
    },
    geoLocationErrorNotSupportedText: {
      table: {
        type: { summary: "text" },
        defaultValue: {
          summary: "Geolocation is not supported by your browser."
        }
      },
      control: { type: "text" }
    },
    geoLocationErrorPermissionDeniedText: {
      table: {
        type: { summary: "text" },
        defaultValue: {
          summary:
            "You have denied access to your location. Allow location access in your browser."
        }
      },
      control: { type: "text" }
    },
    geoLocationErrorPositionUnavailableText: {
      table: {
        type: { summary: "text" },
        defaultValue: {
          summary: "Your location is not available at the moment."
        }
      },
      control: { type: "text" }
    },
    geoLocationErrorTimeoutText: {
      table: {
        type: { summary: "text" },
        defaultValue: {
          summary: "The request for your location timed out. Please try again."
        }
      },
      control: { type: "text" }
    },
    geoLocationErrorDefaultText: {
      table: {
        type: { summary: "text" },
        defaultValue: {
          summary: "An error occurred while retrieving your location."
        }
      },
      control: { type: "text" }
    },
    reverseGeocodeErrorDefaultText: {
      table: {
        type: { summary: "text" },
        defaultValue: {
          summary: "Could not fetch address."
        }
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
    branchesConfig: `[{"branchId":"DK-710111","title":"Grønlandsk Bibliotek","location":{"address":"Ukendt addresse et sted i Grønland","value":"Ukendt addresse et sted i Grønland"}},{"branchId":"DK-710110","title":"Biblioteket Rentemestervej","location":{"address":"Suomisvej 7 st. 2","city":"1927 Frederiksberg C","value":"Suomisvej 7 st. 2 1927 Frederiksberg C","lat":"55.6795","lng":"12.5563"}},{"branchId":"DK-710113","title":"Sundby","location":{"address":"Baaringvadvænget 2","city":"5580 Nørre Aaby","value":"Baaringvadvænget 2 5580 Nørre Aaby","lat":"55.4534","lng":"9.89213"}},{"branchId":"DK-710112","title":"Solvang","location":{"address":"Banestien 2 ","city":"6310 Broager","value":"Banestien 2 6310 Broager ","lat":"54.8862","lng":"9.67579"}},{"branchId":"DK-710115","title":"Sydhavn","location":{"address":"Dummy Street 15","city":"2450 København SV","value":"Dummy Street 15 2450 København SV","lat":"55.6530","lng":"12.5450"}},{"branchId":"DK-710114","title":"Bibliotekshuset","location":{"address":"Dummy Street 14","city":"1500 København V","value":"Dummy Street 14 1500 København V","lat":"55.6730","lng":"12.5650"}},{"branchId":"DK-710117","title":"Valby","location":{"address":"Dummy Street 17","city":"2500 Valby","value":"Dummy Street 17 2500 Valby","lat":"55.6670","lng":"12.5010"}},{"branchId":"DK-710116","title":"Tingbjerg","location":{"address":"Dummy Street 16","city":"2700 Brønshøj","value":"Dummy Street 16 2700 Brønshøj","lat":"55.7100","lng":"12.5200"}},{"branchId":"DK-710119","title":"Vesterbro","location":{"address":"Dummy Street 19","city":"1620 København V","value":"Dummy Street 19 1620 København V","lat":"55.6680","lng":"12.5520"}},{"branchId":"DK-710118","title":"Vanløse","location":{"address":"Dummy Street 18","city":"2720 Vanløse","value":"Dummy Street 18 2720 Vanløse","lat":"55.6830","lng":"12.4880"}},{"branchId":"DK-710100","title":"Hovedbiblioteket","location":{"address":"Dummy Street 100","city":"1550 København V","value":"Dummy Street 100 1550 København V","lat":"55.6760","lng":"12.5700"}},{"branchId":"DK-710120","title":"Vigerslev","location":{"address":"Dummy Street 120","city":"2500 Valby","value":"Dummy Street 120 2500 Valby","lat":"55.6550","lng":"12.4950"}},{"branchId":"DK-710122","title":"Ørestad","location":{"address":"Dummy Street 122","city":"2300 København S","value":"Dummy Street 122 2300 København S","lat":"55.6380","lng":"12.5780"}},{"branchId":"DK-710121","title":"Østerbro","location":{"address":"Dummy Street 121","city":"2100 København Ø","value":"Dummy Street 121 2100 København Ø","lat":"55.7050","lng":"12.5760"}},{"branchId":"DK-710104","title":"Blågården","location":{"address":"Dummy Street 104","city":"2200 København N","value":"Dummy Street 104 2200 København N","lat":"55.6900","lng":"12.5550"}},{"branchId":"DK-710106","title":"Christianshavn","location":{"address":"Dummy Street 106","city":"1420 København K","value":"Dummy Street 106 1420 København K","lat":"55.6730","lng":"12.5930"}},{"branchId":"DK-710105","title":"Brønshøj","location":{"address":"Dummy Street 105","city":"2700 Brønshøj","value":"Dummy Street 105 2700 Brønshøj","lat":"55.7020","lng":"12.5100"}},{"branchId":"DK-710108","title":"Islands Brygge","location":{"address":"Dummy Street 108","city":"2300 København S","value":"Dummy Street 108 2300 København S","lat":"55.6600","lng":"12.5800"}},{"branchId":"DK-710107","title":"Husum","location":{"address":"Dummy Street 107","city":"2700 Brønshøj","value":"Dummy Street 107 2700 Brønshøj","lat":"55.7050","lng":"12.5250"}},{"branchId":"DK-710109","title":"Øbro Jagtvej"}]`,
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
    findLibraryDialogSuggestionsListLabelText: "Choose library",

    geoLocationErrorNotSupportedText:
      "Geolocation is not supported by your browser.",
    geoLocationErrorPermissionDeniedText:
      "You have denied access to your location. Allow location access in your browser.",
    geoLocationErrorPositionUnavailableText:
      "Your location is not available at the moment.",
    geoLocationErrorTimeoutText:
      "The request for your location timed out. Please try again.",
    geoLocationErrorDefaultText:
      "An error occurred while retrieving your location.",
    reverseGeocodeErrorDefaultText: "Could not fetch address"
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
